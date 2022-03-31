/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChainSummary, Fees, Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { IdentityRegistrationStatus } from 'mysterium-vpn-js/lib/identity/identity'
import { TOKENS_EMPTY } from '../constants/instances'
import { AppState, currentIdentity, onBoarding } from './app.slice'
import { SSEState } from './sse.slice'

export const EMPTY_IDENTITY: Identity = {
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
}

interface RootState {
  app: AppState
  sse: SSEState
}

const currentIdentitySelector = ({ app, sse }: RootState): Identity => {
  const identity = currentIdentity(app.currentIdentityRef, sse.appState?.identities)
  return identity || EMPTY_IDENTITY
}

const feesSelector = ({ app }: RootState): Fees => app.fees

const chainSummarySelector = ({ app }: RootState): ChainSummary => app.chainSummary

const configSelector = ({ app }: RootState): Config => app.config

const onBoardingStateSelector = ({ app, sse }: RootState) =>
  onBoarding(app.auth, app.terms, currentIdentitySelector({ app, sse }))

const liveSessionsSelector = ({ sse }: RootState) => sse.appState?.sessions || []

const liveSessionStatsSelector = ({ sse }: RootState) => sse.appState?.sessionsStats || {}

const serviceInfoSelector = ({ sse }: RootState) => sse.appState?.serviceInfo || []

const isAutomaticWithdrawalSelector = ({ app }: RootState) => {
  const { beneficiary, currentIdentity } = app
  return currentIdentity.channelAddress !== beneficiary
}

const beneficiarySelector = ({ app }: RootState) => app.beneficiary

export const selectors = {
  currentIdentitySelector,
  feesSelector,
  configSelector,
  onBoardingStateSelector,
  chainSummarySelector,
  liveSessionsSelector,
  liveSessionStatsSelector,
  serviceInfoSelector,
  isAutomaticWithdrawalSelector,
  beneficiarySelector,
}
