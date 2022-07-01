/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChainSummary, FeesResponse, Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { IDENTITY_EMPTY } from '../constants/instances'
import { AppState, currentIdentity, onBoarding } from './app.slice'
import { SSEState } from './sse.slice'

interface RootState {
  app: AppState
  sse: SSEState
}

const currentIdentitySelector = ({ app, sse }: RootState): Identity => {
  const identity = currentIdentity(app.currentIdentityRef, sse.appState?.identities)
  return identity || IDENTITY_EMPTY
}

const feesSelector = ({ app }: RootState): FeesResponse => app.fees

const chainSummarySelector = ({ app }: RootState): ChainSummary => app.chainSummary

const configSelector = ({ app }: RootState): Config => app.config

const defaultConfigSelector = ({ app }: RootState): Config => app.defaultConfig

const onBoardingStateSelector = ({ app, sse }: RootState) =>
  onBoarding(app.auth, app.terms, currentIdentitySelector({ app, sse }))

const liveSessionsSelector = ({ sse }: RootState) => sse.appState?.sessions || []

const liveSessionStatsSelector = ({ sse }: RootState) => sse.appState?.sessionsStats || {}

const serviceInfoSelector = ({ sse }: RootState) => sse.appState?.serviceInfo || []

const beneficiarySelector = ({ app }: RootState) => app.beneficiary

const isSSELoading = ({ sse }: RootState) => sse.isLoading

export const selectors = {
  currentIdentitySelector,
  feesSelector,
  configSelector,
  defaultConfigSelector,
  onBoardingStateSelector,
  chainSummarySelector,
  liveSessionsSelector,
  liveSessionStatsSelector,
  serviceInfoSelector,
  beneficiarySelector,
  isSSELoading,
}
