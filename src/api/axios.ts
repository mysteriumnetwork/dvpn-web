/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiClientFactory } from 'mysterium-vpn-js'

export const http = new TequilapiClientFactory(
  `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
  20_000,
).axiosInstance()
