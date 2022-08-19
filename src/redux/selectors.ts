/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChainSummary, FeesResponse, Identity, IdentityRef } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { IDENTITY_EMPTY } from '../constants/instances'
import { AppState, Auth, Onboarding, Terms } from './app.slice'
import { SSEState } from './sse.slice'
import _ from 'lodash'
import termsPackageJson from '@mysteriumnetwork/terms/package.json'
import identities from '../commons/identities'

interface RootState {
  app: AppState
  sse: SSEState
}

// Hot identity details (from SSE).
const currentIdentityFromSSE = (identityRef?: IdentityRef, identities?: Identity[]): Identity | undefined => {
  const result = (identities || []).filter((si) => si.id === identityRef?.id)
  return _.head(result)
}

const currentIdentity = ({ app, sse }: RootState): Identity => {
  const identity = currentIdentityFromSSE(app.currentIdentityRef, sse.appState?.identities)
  return identity || IDENTITY_EMPTY
}

const fees = ({ app }: RootState): FeesResponse => app.fees

const chainSummary = ({ app }: RootState): ChainSummary => app.chainSummary

const currentConfig = ({ app }: RootState): Config => app.config

const defaultConfig = ({ app }: RootState): Config => app.defaultConfig

const termsAccepted = (terms: Terms): boolean => {
  return !!terms.acceptedVersion && terms.acceptedVersion === termsPackageJson.version
}

const buildOnBoarding = (auth: Auth, terms: Terms, currentIdentity: Identity): Onboarding => {
  const onBoarding = {
    needsAgreedTerms: !termsAccepted(terms),
    needsPasswordChange: auth.withDefaultCredentials,
    needsRegisteredIdentity: identities.isUnregistered(currentIdentity),
  } as Onboarding

  onBoarding.needsOnBoarding = onBoarding.needsPasswordChange
  return onBoarding
}

const onBoarding = ({ app, sse }: RootState) => buildOnBoarding(app.auth, app.terms, currentIdentity({ app, sse }))

const liveSessions = ({ sse }: RootState) => sse.appState?.sessions || []

const liveSessionStats = ({ sse }: RootState) => sse.appState?.sessionsStats || {}

const runningServices = ({ sse }: RootState) => sse.appState?.serviceInfo || []

const beneficiary = ({ app }: RootState) => app.beneficiary

const isSSELoading = ({ sse }: RootState) => sse.loading

const isAppLoading = ({ app }: RootState) => app.loading

const beneficiaryTxStatus = ({ app }: RootState) => app.beneficiaryTxStatus

const healthCheck = ({ app }: RootState) => app.healthCheckResponse

const auth = ({ app }: RootState) => app.auth

const natType = ({ app }: RootState) => app.natType

export const selectors = {
  currentIdentity,
  fees,
  currentConfig,
  defaultConfig,
  onBoarding,
  chainSummary,
  liveSessions,
  liveSessionStats,
  runningServices,
  beneficiary,
  isSSELoading,
  isAppLoading,
  beneficiaryTxStatus,
  healthCheck,
  auth,
  natType,
}
