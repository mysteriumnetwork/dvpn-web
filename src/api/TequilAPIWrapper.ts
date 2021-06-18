/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { TequilapiError } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'

import { ServiceType } from '../commons'
import { store } from '../redux/store'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { updateConfigStore, updateTermsStore, updateUserConfigStore } from '../redux/app.slice'

import { tequilapiClient } from './TequilApiClient'

export const login = async (username: string, password: string): Promise<void> => {
  return await tequilapiClient.authLogin({ username, password }).then(() => Promise.resolve())
}

export const loginWithDefaultCredentials = async (): Promise<boolean> => {
  try {
    await tequilapiClient.authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD })

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
    await tequilapiClient.healthCheck()
  } catch (e) {
    if (e instanceof TequilapiError && e.isUnauthorizedError) {
      return false
    }
  }

  return true
}

export const acceptWithTermsAndConditions = async () => {
  return await tequilapiClient
    .termsUpdate({
      agreedProvider: true,
      agreedVersion: termsPackageJson.version,
    })
    .then(() => store.dispatch(updateTermsStore({ acceptedVersion: termsPackageJson.version })))
}

export const updateConfig = async (): Promise<Config> => {
  return await tequilapiClient.config().then((config) => {
    store.dispatch(updateConfigStore(config))
    return config
  })
}

export const updateUserConfig = async (): Promise<Config> => {
  return await tequilapiClient.userConfig().then((config) => {
    store.dispatch(updateUserConfigStore(config))
    return config
  })
}

export const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
  return await tequilapiClient
    .updateUserConfig({
      data: {
        'access-policy': {
          list: policyName,
        },
      },
    })
    .then(updateConfig)
}

export const setTrafficShaping = async (enabled: boolean, bandwidthKbps: number): Promise<Config> => {
  return await tequilapiClient
    .updateUserConfig({
      data: {
        shaper: {
          enabled: enabled,
          bandwidth: bandwidthKbps,
        },
      },
    })
    .then(updateConfig)
}

export const setServicePrice = async (
  pricePerHour: number,
  pricePerGiB: number,
  service: ServiceType,
): Promise<Config> => {
  const configServiceName = service === ServiceType.OPENVPN ? 'openvpn' : 'wireguard'
  return await tequilapiClient
    .updateUserConfig({
      data: {
        [configServiceName]: {
          'price-hour': pricePerHour,
          'price-gib': pricePerGiB,
        },
      },
    })
    .then(updateConfig)
}

export const setAllServicePrice = async (pricePerHour: number | null, pricePerGiB: number | null): Promise<Config> => {
  return await tequilapiClient
    .updateUserConfig({
      data: {
        openvpn: {
          'price-hour': pricePerHour,
          'price-gib': pricePerGiB,
        },
        wireguard: {
          'price-hour': pricePerHour,
          'price-gib': pricePerGiB,
        },
      },
    })
    .then(updateConfig)
    .then(updateUserConfig)
}

export const setChainId = async (chainId: number): Promise<Config> => {
  return await tequilapiClient
    .updateUserConfig({
      data: {
        'chain-id': chainId,
      },
    })
    .then(updateConfig)
}
