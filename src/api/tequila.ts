/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { AxiosAdapter, TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults'
import { updateBeneficiaryStore, updateConfigStore, updateTermsStore } from '../redux/app.slice'

import { store } from '../redux/store'
import qs from 'qs'
import { AxiosInstance } from 'axios'
import errorInterceptors from './error.interceptors'

const buildAxios = (): AxiosInstance => {
  const instance = new TequilapiClientFactory(
    `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
    20_000,
  ).axiosInstance()

  instance.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' }) // arrays will be serialized as: ?types=1&types=2...
    }

    return config
  }, errorInterceptors.buildLogError('request'))

  instance.interceptors.response.use((response) => response, errorInterceptors.buildLogError('response'))

  return instance
}

const http = buildAxios()

const tequilaClient: TequilapiClient = new TequilapiClient(new AxiosAdapter(http, 20_000))

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

const refreshBeneficiary = async (identity: string) => {
  try {
    const beneficiaryResponse = await tequilaClient.identityBeneficiary(identity)
    store.dispatch(updateBeneficiaryStore(beneficiaryResponse))
  } catch (ignored: any) {}
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

const setUserConfig = async (data: any): Promise<Config> => {
  return await tequilaClient.updateUserConfig({ data }).then(refreshStoreConfig)
}

const stopAllServices = async () => {
  const services = await tequilaClient.serviceList()
  await Promise.all([services.filter((s) => s.status === 'Running').map((s) => tequilaClient.serviceStop(s.id!))])
}

const startAllServices = async (identity: string) => {
  const services = await tequilaClient.serviceList()
  await Promise.all([
    services
      .filter((s) => s.status === 'NotRunning')
      .map((s) =>
        tequilaClient.serviceStart({
          providerId: identity,
          type: s.type,
        }),
      ),
  ])
}

const restartRunningServices = async (identity: string) => {
  const services = await tequilaClient.serviceList()
  const running = services.filter((s) => s.status === 'Running')

  await Promise.all([running.map((s) => tequilaClient.serviceStop(s.id!))])
  await Promise.all([
    running.map((s) =>
      tequilaClient.serviceStart({
        providerId: identity,
        type: s.type,
      }),
    ),
  ])
}

export const tequila = {
  api: tequilaClient,
  http: http,
  loginWithDefaultCredentials,
  isUserAuthenticated,
  acceptWithTermsAndConditions,
  refreshStoreConfig,
  setAccessPolicy,
  setTrafficShaping,
  setChainId,
  setUserConfig,
  setFeatures,
  refreshBeneficiary,
  startAllServices,
  stopAllServices,
  restartRunningServices,
}
