/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiClient, TequilapiClientFactory } from 'mysterium-vpn-js'

const factory = new TequilapiClientFactory(
  `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
  10_000,
)
export const api: TequilapiClient = factory.build()
