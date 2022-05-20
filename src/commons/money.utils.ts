/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Currency, DECIMAL_PART, displayMoney, DisplayMoneyOptions } from 'mysterium-vpn-js'

import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index'

export const ETHER_FRACTIONS = 18

export const currentCurrency = (): Currency => {
  return Currency.MYST
}

/**
 * @deprecated use mysts.ts
 * @param amountWei
 * @param precision
 */
export const toMyst = (amountWei: number, precision: number = 7): number => {
  const m = Math.pow(10, precision)
  const amountMyst = amountWei / DECIMAL_PART
  return Math.floor(amountMyst * m) / m
}

/**
 * @deprecated use mysts.ts
 * @param amountWei
 * @param precision
 */
const flooredAmount = (amount: number, precision: number = 7): number => {
  const m = Math.pow(10, precision)
  return Math.floor(amount * m) / m
}

/**
 * @deprecated use mysts.ts
 */
export const displayMyst = (amount: number = 0, opts: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS): string => {
  const smallestDisplayableAmount = Math.pow(10, ETHER_FRACTIONS - (opts.fractionDigits || 0))
  if (amount !== 0 && amount < smallestDisplayableAmount) {
    return `< ${displayMoney({ amount: smallestDisplayableAmount, currency: currentCurrency() }, opts)}`
  }
  return displayMoney({ amount: amount || 0, currency: currentCurrency() }, opts)
}

/**
 * @deprecated use mysts.ts
 */
export const displayMystWholeOnly = (
  amount?: number,
  opts: DisplayMoneyOptions = { ...DEFAULT_MONEY_DISPLAY_OPTIONS, fractionDigits: 0, decimalPart: 1 },
): string => {
  return displayMoney({ amount: amount || 0, currency: currentCurrency() }, opts)
}

/**
 * @deprecated use mysts.ts
 */
export const money = {
  flooredAmount,
}
