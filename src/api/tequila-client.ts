/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AxiosAdapter, TequilapiClient } from 'mysterium-vpn-js'
import { http } from './axios'

export const tequilaClient: TequilapiClient = new TequilapiClient(new AxiosAdapter(http, 20_000))
