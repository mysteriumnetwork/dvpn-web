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

const displayMYST = (
  amount: string | number | undefined,
  options: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => {
  const symbol = options?.showCurrency ? ' ' + currentCurrency() : ''
  if (!amount) {
    return `0${symbol}`
  }

  const decimal = Decimal.clone({ precision: options?.fractionDigits || 7 })
  return `${new decimal(amount).div(DECIMAL_PART).toString()}${symbol}`
}

export const myst = {
  displayMYST,
}
