/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Prices } from './types'
import { ServiceEarnings } from './ServiceCard'

export const PRICE_EMPTY: Prices = Object.freeze({ pricePerGibWei: '0', pricePerHourWei: '0' })
export const SERVICE_EARNINGS_EMPTY: ServiceEarnings = Object.freeze({ earningsWei: 0, totalEarningWei: 0 })
