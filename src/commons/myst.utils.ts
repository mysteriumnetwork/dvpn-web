/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BigNumber from 'bignumber.js'
import { DECIMAL_PART, DisplayMoneyOptions } from 'mysterium-vpn-js'
import { currentCurrency } from './money.utils'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index'

const format = (
  amount: string | number | BigNumber,
  options: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => {
  const symbol = options?.showCurrency ? ' ' + currentCurrency() : ''
  const requiredPrecision = options?.fractionDigits || 18

  const bigMyst = BigNumber.clone({ ROUNDING_MODE: BigNumber.ROUND_DOWN, POW_PRECISION: 18 })
  const lowestDisplayable = new bigMyst(1).div(Math.pow(10, requiredPrecision))

  const ethers = new bigMyst(amount).div(DECIMAL_PART)

  if (ethers.gt(0) && ethers.isLessThan(lowestDisplayable)) {
    return `< ${lowestDisplayable.toFixed(requiredPrecision)}${symbol}`
  }
  return `${ethers.toFixed(requiredPrecision)}${symbol}`
}

// TODO rethink API
const display = (
  wei: string | BigNumber | number = 0,
  override: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS,
): string => format(wei, { ...DEFAULT_MONEY_DISPLAY_OPTIONS, ...override })

const ZERO_OUT_FROM = String(Number.MAX_SAFE_INTEGER).length - 1

// TODO don't remember why
const weiSafeString = (wei: number): string => {
  const weiString = String(wei)

  let zeroedOut = ''
  for (let i = 0; i < weiString.length; i++) {
    zeroedOut += i >= ZERO_OUT_FROM ? '0' : weiString[i]
  }

  return zeroedOut
}

const toEtherBig = (wei: BigNumber | string | number): BigNumber => {
  return new (BigNumber.clone({ POW_PRECISION: 0, ROUNDING_MODE: BigNumber.ROUND_DOWN }))(wei).div(DECIMAL_PART)
}

const toEtherString = (wei: BigNumber | string | number): string => {
  return toEtherBig(wei).toFixed()
}

const toWeiString = (ether: BigNumber | string | number): string => {
  return toWeiBig(ether).toFixed()
}

const toWeiBig = (ether: BigNumber | string | number): BigNumber => {
  return new (BigNumber.clone({ POW_PRECISION: 0 }))(ether).times(DECIMAL_PART)
}

const toBig = (value: BigNumber | string | number): BigNumber => {
  return new BigNumber(value)
}

export const myst = {
  display,
  toEtherString,
  toEtherBig,
  toWeiString,
  toWeiBig,
  toBig,
  weiSafeString,
}
