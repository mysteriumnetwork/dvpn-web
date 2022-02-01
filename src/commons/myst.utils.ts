/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DECIMAL_PART, DisplayMoneyOptions } from 'mysterium-vpn-js'
import Decimal from 'decimal.js'
import { currentCurrency } from './money.utils'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index'

/**
 * @deprecated use display()
 * @param amount
 * @param options
 */
const displayMYST = (
  amount: string | number = 0,
  options: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => {
  const symbol = options?.showCurrency ? ' ' + currentCurrency() : ''
  const requiredPrecision = options?.fractionDigits || 18
  const decimal = Decimal.clone({ precision: requiredPrecision })

  const humanAmount = new decimal(amount).div(DECIMAL_PART)

  if (-1 * humanAmount.e > requiredPrecision) {
    return `< ${new decimal('1').div(Math.pow(10, requiredPrecision)).toFixed()}${symbol}`
  }
  return `${new decimal(amount).div(DECIMAL_PART).toFixed(requiredPrecision)}${symbol}`
}

const display = (
  amount: string | number | undefined,
  override: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => {
  return displayMYST(amount, { ...DEFAULT_MONEY_DISPLAY_OPTIONS, ...override })
}

const ZERO_OUT_FROM = String(Number.MAX_SAFE_INTEGER).length - 1

const weiSafeString = (wei: number): string => {
  const weiString = String(wei)

  let zeroedOut = ''
  for (let i = 0; i < weiString.length; i++) {
    zeroedOut += i >= ZERO_OUT_FROM ? '0' : weiString[i]
  }

  return zeroedOut
}

export const myst = {
  displayMYST,
  display,
  weiSafeString,
}
