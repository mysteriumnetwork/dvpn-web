/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios, { AxiosInstance } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import qs from 'qs'
import snakecaseKeys from 'snakecase-keys'

export const http: AxiosInstance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
})

const convertOptions = {
  deep: true,
}

http.interceptors.response.use(
  (config) => {
    if (config?.data) {
      config.data = camelcaseKeys(config.data, convertOptions)
    }
    return config
  },
  (error: any) => {
    if (error?.response?.data) {
      error.response.data = camelcaseKeys(error.response.data, convertOptions)
    }
    return Promise.reject(error)
  },
)

http.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' }) // arrays will be serialized as: ?types=1&types=2...
  }

  if (config?.params) {
    config.params = snakecaseKeys(config.params, convertOptions)
  }
  if (config?.data) {
    config.data = snakecaseKeys(config.data, convertOptions)
  }
  return config
})
