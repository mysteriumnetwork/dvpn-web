/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  BeneficiaryTxState,
  BeneficiaryTxStatus,
  FeesResponse,
  FeesV2,
  Identity,
  IdentityRegistrationStatus,
  NatTypeResponse,
  NodeHealthcheck,
  SessionsV2Response,
  SettlementListResponse,
  EarningsPerServiceResponse,
} from 'mysterium-vpn-js'

export const TOKENS_EMPTY = Object.freeze({
  wei: '0',
  ether: '0',
  human: '0',
})

export const FEES_V2_EMPTY: FeesV2 = Object.freeze({
  registration: TOKENS_EMPTY,
  decreaseStake: TOKENS_EMPTY,
  settlement: TOKENS_EMPTY,
  validUntil: new Date(0).toJSON(),
})

export const FEES_RESPONSE_EMPTY: FeesResponse = Object.freeze({
  last: FEES_V2_EMPTY,
  current: FEES_V2_EMPTY,
  hermesPercent: '0.2000',
  serverTime: new Date(0).toJSON(),
})

export const IDENTITY_EMPTY: Identity = Object.freeze({
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
})

export const HEALTHCHECK_EMPTY: NodeHealthcheck = Object.freeze({
  uptime: '0',
  process: 0,
  version: '0',
  buildInfo: {
    commit: 'N/A',
    branch: 'N/A',
    buildNumber: 'N/A',
  },
})

export const SETTLEMENT_LIST_RESPONSE_EMPTY: SettlementListResponse = Object.freeze({
  items: [],
  totalPages: 0,
  page: 1,
  pageSize: 10,
  totalItems: 0,
  withdrawalTotal: '0',
})

export const SESSIONS_V2_RESPONSE_EMPTY: SessionsV2Response = Object.freeze({
  sessions: [],
})

export const BENEFICIARY_TX_STATUS_EMPTY: BeneficiaryTxStatus = Object.freeze({
  state: BeneficiaryTxState.COMPLETED,
  error: '',
})

export const NAT_TYPE_RESPONSE_EMPTY: NatTypeResponse = Object.freeze({
  type: '',
  error: '',
})

export const PRICE_EARNINGS_PER_SERVICE: EarningsPerServiceResponse = Object.freeze({
  publicTokens: TOKENS_EMPTY,
  dataTransferTokens: TOKENS_EMPTY,
  dvpnTokens: TOKENS_EMPTY,
  scrapingTokens: TOKENS_EMPTY,
  totalTokens: TOKENS_EMPTY,
  totalDvpnTokens: TOKENS_EMPTY,
  totalPublicTokens: TOKENS_EMPTY,
  totalDataTransferTokens: TOKENS_EMPTY,
  totalScrapingTokens: TOKENS_EMPTY,
})
