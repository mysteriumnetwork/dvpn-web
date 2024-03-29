/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Currency } from 'mysterium-vpn-js'

export const currentCurrency = (): Currency => {
  return Currency.MYST
}
