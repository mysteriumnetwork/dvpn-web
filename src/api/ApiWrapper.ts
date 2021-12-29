/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { TequilapiError } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'

import { store } from '../redux/store'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { updateConfigStore, updateTermsStore } from '../redux/app.slice'

import { api } from './Api'

const login = async (username: string, password: string): Promise<void> => {
  return await api.authLogin({ username, password }).then(() => Promise.resolve())
}

const loginWithDefaultCredentials = async (): Promise<boolean> => {
  try {
    await api.authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD })
    return true
  } catch (e) {
    if (e instanceof TequilapiError && e.isUnauthorizedError) {
      return false
    }
  }

  return false
}

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    await api.identityList()
  } catch (e) {
    if (e instanceof TequilapiError && e.isUnauthorizedError) {
      return false
    }
  }

  return true
}

const acceptWithTermsAndConditions = async () => {
  return await api
    .termsUpdate({
      agreedProvider: true,
      agreedVersion: termsPackageJson.version,
    })
    .then(() => store.dispatch(updateTermsStore({ acceptedVersion: termsPackageJson.version })))
}

const refreshStoreConfig = async (): Promise<Config> => {
  return await api.config().then((config) => {
    store.dispatch(updateConfigStore(config))
    return config
  })
}

const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        'access-policy': {
          list: policyName,
        },
      },
    })
    .then(refreshStoreConfig)
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

const setChainId = async (chainId: number): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        'chain-id': chainId,
      },
    })
    .then(refreshStoreConfig)
}

export const setUserConfig = async (data: any): Promise<Config> => {
  return await api.updateUserConfig({ data }).then(refreshStoreConfig)
}

export const tequila = {
  api,
  login,
  loginWithDefaultCredentials,
  isUserAuthenticated,
  acceptWithTermsAndConditions,
  refreshStoreConfig,
  setAccessPolicy,
  setTrafficShaping,
  setChainId,
  setUserConfig,
}
