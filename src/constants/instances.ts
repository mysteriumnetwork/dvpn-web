/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Config,
  CurrentPricesResponse,
  Fees,
  Identity,
  IdentityRegistrationStatus,
  MMNApiKeyResponse,
  NodeHealthcheck,
  SessionListResponse,
  SessionStats,
} from 'mysterium-vpn-js'

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
  hermesTokens: TOKENS_EMPTY,
  hermesPercent: '0.000',
  decreaseStake: 0,
  decreaseStakeTokens: TOKENS_EMPTY,
})

export const CURRENT_PRICES_EMPTY: CurrentPricesResponse = Object.freeze({
  pricePerHour: BigInt(0),
  pricePerGib: BigInt(0),
  pricePerHourTokens: TOKENS_EMPTY,
  pricePerGibTokens: TOKENS_EMPTY,
})

export const IDENTITY_EMPTY: Identity = {
  id: '0x',
  registrationStatus: IdentityRegistrationStatus.RegistrationError,
  channelAddress: '0x',
  balance: 0,
  balanceTokens: TOKENS_EMPTY,
  earnings: 0,
  earningsTokens: TOKENS_EMPTY,
  earningsTotal: 0,
  earningsTotalTokens: TOKENS_EMPTY,
  stake: 0,
  hermesId: '0x',
  earningsPerHermes: {},
}

export const SESSION_STATS_EMPTY: SessionStats = {
  count: 0,
  countConsumers: 0,
  sumBytesReceived: 0,
  sumBytesSent: 0,
  sumDuration: 0,
  sumTokens: 0,
}

export const CONFIG_EMPTY: Config = { data: {} }

export const HEALTHCHECK_EMPTY: NodeHealthcheck = {
  uptime: '0',
  process: 0,
  version: '0',
  buildInfo: {
    commit: 'N/A',
    branch: 'N/A',
    buildNumber: 'N/A',
  },
}

export const MMN_KEY_RESPONSE_EMPTY: MMNApiKeyResponse = {
  apiKey: 'N/A',
}

export const SESSIONS_LIST_RESPONSE_EMPTY: SessionListResponse = {
  items: [],
  page: 1,
  pageSize: 0,
  totalItems: 0,
  totalPages: 0,
}
