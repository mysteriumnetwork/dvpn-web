/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AxiosAdapter, TequilapiClient } from 'mysterium-vpn-js'
import { http } from './Client'

export const api: TequilapiClient = new TequilapiClient(new AxiosAdapter(http, 20_000))
