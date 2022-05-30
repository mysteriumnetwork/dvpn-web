/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BigNumber from 'bignumber.js'
import { FeesResponse, FeesV2, Tokens } from 'mysterium-vpn-js'
import { myst } from './mysts'

export interface CalculatedFees {
  earningsWei: BigNumber
  hermesCutPercent: number
  hermesCutWei: BigNumber
  blockchainFeeWei: BigNumber
  profitsWei: BigNumber
  totalFeesWei: BigNumber
}

const calculateEarnings = (earnings: Tokens, fees: FeesV2, hermesPercent: string): CalculatedFees => {
  const { toBig } = myst
  const { settlement } = fees
  const hermesCutPercent = Number(hermesPercent)
  const hermesCutWei = toBig(earnings.wei).times(hermesCutPercent)
  const totalFeesWei = toBig(hermesCutWei).plus(settlement.wei)
  const profitsWei = toBig(earnings.wei).minus(totalFeesWei)

  return {
    earningsWei: toBig(earnings.wei),
    hermesCutWei,
    hermesCutPercent,
    blockchainFeeWei: toBig(settlement.wei),
    profitsWei,
    totalFeesWei,
  }
}

const ZERO_DATE = new Date(0).toJSON()

const isEmpty = (fees: FeesResponse): boolean => fees.serverTime === ZERO_DATE

// intentional typo
export const feez = {
  calculateEarnings,
  isEmpty,
}
