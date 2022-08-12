/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tequila } from '../api/tequila'
import { DEFAULT_IDENTITY_PASSPHRASE } from '../constants/defaults'

import {
  updateAuthenticatedStore,
  updateBeneficiaryTxStatusStore,
  updateChainSummaryStore,
  updateConfigStore,
  updateDefaultConfigStore,
  updateFeesStore,
  updateIdentityRefStore,
  updateTermsStore,
} from './app.slice'
import { store } from './store'
import errors from '../commons/errors'

const { api } = tequila

export const updateTermsStoreAsync = async () => {
  const { dispatch } = store
  const terms = await api.terms()
  dispatch(
    updateTermsStore({
      acceptedVersion: terms.agreedVersion,
    }),
  )
}

export const fetchIdentityAndRelativeInformationAsync = async () => {
  const { dispatch } = store
  const identityRef = await api.identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
  dispatch(updateIdentityRefStore(identityRef))
  await api.identityBalanceRefresh(identityRef.id)

  await api
    .beneficiaryTxStatus(identityRef.id)
    .then((txStatus) => dispatch(updateBeneficiaryTxStatusStore(txStatus)))
    .catch(() => {
      // 404
    })
}

export const fetchConfigAsync = async () => {
  const { dispatch } = store
  const config = await api.config()
  dispatch(updateConfigStore(config))
}

export const fetchDefaultConfigAsync = async () => {
  const { dispatch } = store
  const defaultConfig = await api.defaultConfig()
  dispatch(updateDefaultConfigStore(defaultConfig))
}

export const fetchChainSummaryAsync = async () => {
  try {
    const { dispatch } = store
    const chainSummary = await api.chainSummary()
    dispatch(updateChainSummaryStore(chainSummary))
  } catch (err: any) {
    errors.parseToastError(err)
  }
}

export const loadAppStateAfterAuthenticationAsync = async ({ isDefaultPassword }: { isDefaultPassword: boolean }) => {
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
  await updateFees()
}

const SECOND = 1000

const updateFees = async () => {
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
    setTimeout(() => updateFees(), staleInMs - SECOND * 10)
  } catch (ignored: any) {
    setTimeout(() => updateFees(), SECOND * 10)
  }
}
