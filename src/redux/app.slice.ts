/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees, IdentityRef, Identity, ChainSummary } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { createSlice } from '@reduxjs/toolkit'
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { isUnregistered } from '../commons/identity.utils'
import _ from 'lodash'

export interface Auth {
  authenticated?: boolean
  withDefaultCredentials: boolean
}

export interface Terms {
  acceptedVersion: string | undefined
}

export interface Onboarding {
  needsAgreedTerms: boolean
  needsPasswordChange: boolean
  needsRegisteredIdentity: boolean
  needsOnBoarding: boolean
}

export interface AppState {
  loading: boolean
  currentIdentityRef?: IdentityRef
  currentIdentity?: Identity
  auth: Auth
  terms: Terms
  config: Config
  fees: Fees
  chainSummary: ChainSummary
}

const INITIAL_STATE: AppState = {
  loading: true,
  auth: {
    authenticated: false,
    withDefaultCredentials: false,
  },
  terms: {
    acceptedVersion: undefined,
  },
  fees: {
    registration: 0,
    settlement: 0,
    hermes: 0,
    decreaseStake: 0,
  },
  config: {
    data: {},
  },
  chainSummary: {
    chains: {
      [-1]: 'Unknown',
    },
    currentChain: -1,
  },
}

const slice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    updateAuthenticatedStore: (state, action) => {
      state.auth = action.payload
    },
    updateIdentityRefStore: (state, action) => {
      state.currentIdentityRef = action.payload
    },
    updateIdentityStore: (state, action) => {
      state.currentIdentity = action.payload
    },
    updateTermsStore: (state, action) => {
      state.terms = action.payload
    },
    updateAuthFlowLoadingStore: (state, action) => {
      state.loading = action.payload
    },
    updateConfigStore: (state, action) => {
      state.config = action.payload
    },
    updateFeesStore: (state, action) => {
      state.fees = action.payload
    },
    updateChainSummaryStore: (state, action) => {
      state.chainSummary = action.payload
    },
  },
})

// Hot identity details (from SSE).
const currentIdentity = (identityRef?: IdentityRef, identities?: Identity[]): Identity | undefined => {
  const result = (identities || []).filter((si) => si.id === identityRef?.id)
  return _.head(result)
}

const onBoarding = (auth: Auth, terms: Terms, currentIdentity: Identity): Onboarding => {
  const onBoarding = {
    needsAgreedTerms: !termsAccepted(terms),
    needsPasswordChange: auth.withDefaultCredentials,
    needsRegisteredIdentity: isUnregistered(currentIdentity),
  } as Onboarding

  onBoarding.needsOnBoarding = onBoarding.needsPasswordChange
  return onBoarding
}

const isLoggedIn = (auth: Auth): boolean => {
  return !!auth.authenticated
}

const termsAccepted = (terms: Terms): boolean => {
  return !!terms.acceptedVersion && terms.acceptedVersion === termsPackageJson.version
}

export { currentIdentity, onBoarding, isLoggedIn, termsAccepted }

export const {
  updateAuthenticatedStore,
  updateIdentityRefStore,
  updateIdentityStore,
  updateTermsStore,
  updateAuthFlowLoadingStore,
  updateConfigStore,
  updateFeesStore,
  updateChainSummaryStore,
} = slice.actions
export default slice.reducer
