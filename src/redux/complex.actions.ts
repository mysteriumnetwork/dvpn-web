/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tequila } from '../api/tequila'
import { DEFAULT_IDENTITY_PASSPHRASE } from '../constants/defaults'

import {
  updateAuthenticatedStore,
  updateBeneficiaryStore,
  updateBeneficiaryTxStatusStore,
  updateChainSummaryStore,
  updateChatOpenedStore,
  updateConfigStore,
  updateDefaultConfigStore,
  updateFeesStore,
  updateIdentityRefStore,
  updateLoadingStore,
  updateNatTypeResponseStore,
  updateTermsStore,
} from './app.slice'
import { store } from './store'
import errors from '../commons/errors'
import { Config } from 'mysterium-vpn-js'
import termsPackageJson from '@mysteriumnetwork/terms/package.json'

const { api } = tequila

const updateTermsStoreAsync = async () => {
  const { dispatch } = store
  const terms = await api.terms()
  dispatch(
    updateTermsStore({
      acceptedVersion: terms.agreedVersion,
    }),
  )
}

const fetchIdentityAndRelativeInformationAsync = async () => {
  const { dispatch } = store
  // nat type takes a lot of time to resolve
  tequila.api.natType().then((response) => dispatch(updateNatTypeResponseStore(response)))
  const identityRef = await api.identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
  dispatch(updateIdentityRefStore(identityRef))
  await api.identityBalanceRefresh(identityRef.id)
  await refreshBeneficiary(identityRef.id)
  await api
    .beneficiaryTxStatus(identityRef.id)
    .then((txStatus) => dispatch(updateBeneficiaryTxStatusStore(txStatus)))
    .catch(() => {
      // 404
    })
}

const fetchConfigAsync = async () => {
  const { dispatch } = store
  const config = await api.config()
  dispatch(updateConfigStore(config))
}

const fetchDefaultConfigAsync = async () => {
  const { dispatch } = store
  const defaultConfig = await api.defaultConfig()
  dispatch(updateDefaultConfigStore(defaultConfig))
}

const fetchChainSummaryAsync = async () => {
  try {
    const { dispatch } = store
    const chainSummary = await api.chainSummary()
    dispatch(updateChainSummaryStore(chainSummary))
  } catch (err: any) {
    errors.parseToastError(err)
  }
}

const loadAppStateAfterAuthenticationAsync = async ({ isDefaultPassword }: { isDefaultPassword: boolean }) => {
  await store.dispatch(updateLoadingStore(true))
  await store.dispatch(
    updateAuthenticatedStore({
      authenticated: true,
      withDefaultCredentials: isDefaultPassword,
    }),
  )
  await updateTermsStoreAsync()
  await fetchIdentityAndRelativeInformationAsync()
  await fetchConfigAsync()
  await fetchDefaultConfigAsync()
  await fetchChainSummaryAsync()
  await startContinuouslyUpdatingFees()
  await store.dispatch(updateLoadingStore(false))
}

const logout = async () => {
  await api.authLogout()

  store.dispatch(updateLoadingStore(true))

  store.dispatch(updateAuthenticatedStore({ authenticated: false, withDefaultCredentials: false }))

  store.dispatch(updateLoadingStore(false))
}
const SECOND = 1000

const startContinuouslyUpdatingFees = async () => {
  if (!store.getState().app.auth.authenticated) {
    return
  }
  try {
    const response = await api.transactorFeesV2()
    const {
      current: { validUntil },
      serverTime,
    } = response
    const staleInMs = new Date(validUntil).getTime() - new Date(serverTime).getTime()
    store.dispatch(updateFeesStore(response))
    setTimeout(() => startContinuouslyUpdatingFees(), staleInMs - SECOND * 10)
  } catch (ignored: any) {
    setTimeout(() => startContinuouslyUpdatingFees(), SECOND * 10)
  }
}

const refreshStoreConfig = async (): Promise<Config> => {
  return await api.config().then((config) => {
    store.dispatch(updateConfigStore(config))
    return config
  })
}

const acceptWithTermsAndConditions = async () => {
  return await api
    .termsUpdate({
      agreedProvider: true,
      agreedVersion: termsPackageJson.version,
    })
    .then(() => store.dispatch(updateTermsStore({ acceptedVersion: termsPackageJson.version })))
}

const refreshBeneficiary = async (identity: string) => {
  try {
    const beneficiaryResponse = await api.identityBeneficiary(identity)
    store.dispatch(updateBeneficiaryStore(beneficiaryResponse))
  } catch (ignored: any) {
    console.error('failed to update beneficiary')
  }
}

const setTrafficShaping = async (enabled: boolean, bandwidthKBps: number): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        shaper: {
          enabled: enabled,
          bandwidth: bandwidthKBps,
        },
      },
    })
    .then(refreshStoreConfig)
}

const setFeatures = async (features: string[]): Promise<Config> => {
  return api
    .updateUserConfig({
      data: {
        'ui.features': features.join(','),
      },
    })
    .then(refreshStoreConfig)
}

const setUserConfig = async (data: any): Promise<Config> => {
  return await api.updateUserConfig({ data }).then(refreshStoreConfig)
}

const setChatOpened = (b: boolean) => store.dispatch(updateChatOpenedStore(b))

const complexActions = {
  loadAppStateAfterAuthenticationAsync,
  setTrafficShaping,
  setUserConfig,
  acceptWithTermsAndConditions,
  refreshBeneficiary,
  setFeatures,
  refreshStoreConfig,
  setChatOpened,
  logout,
}

export default complexActions
