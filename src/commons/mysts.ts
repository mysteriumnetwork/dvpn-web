/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BigNumber from 'bignumber.js'
import { DECIMAL_PART } from 'mysterium-vpn-js'
import { currentCurrency } from './currency'

interface Options {
  currency?: boolean
  fractions?: number
}

const DEFAULTS: Required<Options> = Object.freeze({
  currency: true,
  fractions: 7,
})

const format = (amount: string | number | BigNumber, options: Options = DEFAULTS): string => {
  const symbol = options?.currency ? ' ' + currentCurrency() : ''
  const requiredPrecision = options?.fractions ?? 18

  const bigMyst = BigNumber.clone({ ROUNDING_MODE: BigNumber.ROUND_DOWN, POW_PRECISION: 18 })
  const lowestDisplayable = new bigMyst(1).div(Math.pow(10, requiredPrecision))

  const ethers = new bigMyst(amount).div(DECIMAL_PART)

  if (ethers.gt(0) && ethers.isLessThan(lowestDisplayable)) {
    return `< ${lowestDisplayable.toFixed(requiredPrecision)}${symbol}`
  }
  return `${ethers.toFixed(requiredPrecision)}${symbol}`
}

const display = (wei: string | BigNumber | number = 0, override: Options = DEFAULTS): string =>
  format(wei, { ...DEFAULTS, ...override })

const toEtherBig = (wei: BigNumber | string | number): BigNumber => {
  return new (BigNumber.clone({ POW_PRECISION: 0, ROUNDING_MODE: BigNumber.ROUND_DOWN }))(wei).div(DECIMAL_PART)
}

const toWeiBig = (ether: BigNumber | string | number): BigNumber => {
  return new (BigNumber.clone({ POW_PRECISION: 0 }))(ether).times(DECIMAL_PART)
}

const toBig = (value: BigNumber | string | number, config?: BigNumber.Config): BigNumber => {
  return new (BigNumber.clone(config))(value)
}

export const myst = {
  display,
  toEtherBig,
  toWeiBig,
  toBig,
}
