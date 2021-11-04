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

export const login = async (username: string, password: string): Promise<void> => {
  return await api.authLogin({ username, password }).then(() => Promise.resolve())
}

export const loginWithDefaultCredentials = async (): Promise<boolean> => {
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

export const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    await api.healthCheck()
  } catch (e) {
    if (e instanceof TequilapiError && e.isUnauthorizedError) {
      return false
    }
  }

  return true
}

export const acceptWithTermsAndConditions = async () => {
  return await api
    .termsUpdate({
      agreedProvider: true,
      agreedVersion: termsPackageJson.version,
    })
    .then(() => store.dispatch(updateTermsStore({ acceptedVersion: termsPackageJson.version })))
}

export const updateConfig = async (): Promise<Config> => {
  return await api.config().then((config) => {
    store.dispatch(updateConfigStore(config))
    return config
  })
}

export const updateUserConfig = async (): Promise<Config> => {
  return await api.userConfig().then((config) => {
    return config
  })
}

export const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        'access-policy': {
          list: policyName,
        },
      },
    })
    .then(updateConfig)
}

export const setTrafficShaping = async (enabled: boolean, bandwidthKBps: number): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        shaper: {
          enabled: enabled,
          bandwidth: bandwidthKBps,
        },
      },
    })
    .then(updateConfig)
}

export const setChainId = async (chainId: number): Promise<Config> => {
  return await api
    .updateUserConfig({
      data: {
        'chain-id': chainId,
      },
    })
    .then(updateConfig)
}

export const setUserConfig = async (data: any): Promise<Config> => {
  return await api.updateUserConfig({ data }).then(updateConfig)
}
