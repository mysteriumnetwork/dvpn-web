/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees } from 'mysterium-vpn-js'

export interface CalculatedFees {
  earningsMyst: number
  hermesCutPercent: number
  hermesCutMyst: number
  blockchainFee: number
  profitsMyst: number
}

const calculateEarnings = (earnings: number, fees: Fees): CalculatedFees => {
  const hermesCutPercent = fees.hermes / 10000
  const hermesCutMyst = earnings * hermesCutPercent
  const bottomLineProfit = earnings - hermesCutPercent - fees.settlement
  return {
    earningsMyst: earnings,
    hermesCutMyst,
    hermesCutPercent,
    blockchainFee: fees.settlement,
    profitsMyst: bottomLineProfit,
  }
}

export const feeCalculator = {
  calculateEarnings,
}
