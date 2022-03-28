/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { Config } from 'mysterium-vpn-js/lib/config/config'

import { store } from '../redux/store'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { updateConfigStore, updateTermsStore } from '../redux/app.slice'
import { http } from './axios'

import { tequilaClient } from './tequila-client'

const login = async (username: string, password: string): Promise<void> => {
  return await tequilaClient.authLogin({ username, password }).then(() => Promise.resolve())
}

const loginWithDefaultCredentials = async (): Promise<boolean> => {
  try {
    await tequilaClient.authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD })
    return true
  } catch (e) {
    return false
  }
}

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    await tequilaClient.identityList()
  } catch (e) {
    return false
  }

  return true
}

const acceptWithTermsAndConditions = async () => {
  return await tequilaClient
    .termsUpdate({
      agreedProvider: true,
      agreedVersion: termsPackageJson.version,
    })
    .then(() => store.dispatch(updateTermsStore({ acceptedVersion: termsPackageJson.version })))
}

const refreshStoreConfig = async (): Promise<Config> => {
  return await tequilaClient.config().then((config) => {
    store.dispatch(updateConfigStore(config))
    return config
  })
}

const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
  return await tequilaClient
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
  return await tequilaClient
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
  return await tequilaClient
    .updateUserConfig({
      data: {
        'chain-id': chainId,
      },
    })
    .then(refreshStoreConfig)
}

const setFeatures = async (features: string[]): Promise<Config> => {
  return tequilaClient
    .updateUserConfig({
      data: {
        'ui.features': features.join(','),
      },
    })
    .then(refreshStoreConfig)
}

export const setUserConfig = async (data: any): Promise<Config> => {
  return await tequilaClient.updateUserConfig({ data }).then(refreshStoreConfig)
}

export const tequila = {
  api: tequilaClient,
  http: http,
  login,
  loginWithDefaultCredentials,
  isUserAuthenticated,
  acceptWithTermsAndConditions,
  refreshStoreConfig,
  setAccessPolicy,
  setTrafficShaping,
  setChainId,
  setUserConfig,
  setFeatures,
}
