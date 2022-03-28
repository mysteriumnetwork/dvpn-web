/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees } from 'mysterium-vpn-js'

export const TOKENS_EMPTY = Object.freeze({
  wei: '0',
  ether: '0',
  human: '0',
})

export const FEES_EMPTY: Fees = Object.freeze({
  registration: 0,
  registrationTokens: TOKENS_EMPTY,
  settlement: 0,
  settlementTokens: TOKENS_EMPTY,
  hermes: 0,
  hermesPercent: '0',
  hermesTokens: TOKENS_EMPTY,
  decreaseStake: 0,
  decreaseStakeTokens: TOKENS_EMPTY,
})
