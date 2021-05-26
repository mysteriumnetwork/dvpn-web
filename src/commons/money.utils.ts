/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Currency, displayMoney, DisplayMoneyOptions } from 'mysterium-vpn-js'

import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index'
import { isTestnet } from './config'
import { store } from '../redux/store'

export const currentCurrency = (): Currency => {
  return isTestnet(store.getState()?.app?.config) ? Currency.MYSTTestToken : Currency.MYST
}

export const displayMyst = (amount?: number, opts: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS): string => {
  return displayMoney({ amount: amount || 0, currency: currentCurrency() }, opts)
}

export const displayMystLongNoDecimal = (
  amount?: number,
  opts: DisplayMoneyOptions = { ...DEFAULT_MONEY_DISPLAY_OPTIONS, fractionDigits: 5, decimalPart: 1 },
): string => {
  return displayMoney({ amount: amount || 0, currency: currentCurrency() }, opts)
}

export const displayMystWholeOnly = (
  amount?: number,
  opts: DisplayMoneyOptions = { ...DEFAULT_MONEY_DISPLAY_OPTIONS, fractionDigits: 0, decimalPart: 1 },
): string => {
  return displayMoney({ amount: amount || 0, currency: currentCurrency() }, opts)
}
