/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BigNumber from 'bignumber.js'
import { Fees, Tokens } from 'mysterium-vpn-js'
import { myst } from './myst.utils'

export interface CalculatedFees {
  earningsWei: BigNumber
  hermesCutPercent: number
  hermesCutWei: BigNumber
  blockchainFeeWei: BigNumber
  profitsWei: BigNumber
  totalFeesWei: BigNumber
}

const calculateEarnings = (earnings: Tokens, fees: Fees): CalculatedFees => {
  const { toBig } = myst
  const { settlementTokens } = fees
  const hermesCutPercent = Number(fees.hermesPercent)
  const hermesCutWei = toBig(earnings.wei).times(hermesCutPercent)
  const totalFeesWei = toBig(hermesCutWei).plus(settlementTokens.wei)
  const profitsWei = toBig(earnings.wei).minus(totalFeesWei)

  return {
    earningsWei: toBig(earnings.wei),
    hermesCutWei,
    hermesCutPercent,
    blockchainFeeWei: toBig(settlementTokens.wei),
    profitsWei,
    totalFeesWei,
  }
}

export const feeCalculator = {
  calculateEarnings,
}
