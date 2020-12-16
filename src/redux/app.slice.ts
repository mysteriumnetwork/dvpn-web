/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees, IdentityRef, Identity } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { createSlice } from '@reduxjs/toolkit'

import { areTermsAccepted } from '../commons/terms'
import { isUnregistered } from '../commons/identity.utils'
import _ from 'lodash'

export interface Auth {
  authenticated?: boolean
  withDefaultCredentials?: boolean
}

export interface Terms {
  acceptedAt: string | undefined
  acceptedVersion: string | undefined
}

export interface Onboarding {
  termsAccepted: boolean
  needsPasswordChange: boolean
  needsRegisteredIdentity: boolean
  needsOnboarding: boolean
}

export interface AppState {
  loading: boolean
  currentIdentityRef?: IdentityRef
  currentIdentity?: Identity
  auth: Auth
  terms: Terms
  config?: Config
  fees?: Fees
}

const INITIAL_STATE: AppState = {
  loading: true,
  auth: {
    authenticated: false,
    withDefaultCredentials: false,
  },
  terms: {
    acceptedAt: undefined,
    acceptedVersion: undefined,
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
  },
})

// Hot identity details (from SSE).
const currentIdentity = (identityRef?: IdentityRef, identities?: Identity[]) => {
  const result = (identities || []).filter((si) => si.id === identityRef?.id)
  return _.head(result)
}

const onboardingState = (auth: Auth, terms: Terms, currentIdentity?: Identity): Onboarding => {
  const onboarding = {
    termsAccepted: termsAccepted(terms),
    needsPasswordChange: !!auth.withDefaultCredentials,
    needsRegisteredIdentity: !currentIdentity || isUnregistered(currentIdentity),
  } as Onboarding

  onboarding.needsOnboarding = onboarding.needsPasswordChange || onboarding.needsRegisteredIdentity

  return onboarding
}

const isLoggedIn = (auth: Auth): boolean => {
  return !!auth.authenticated
}

const termsAccepted = (terms: Terms): boolean => {
  return areTermsAccepted(terms.acceptedAt, terms.acceptedVersion)
}

export { currentIdentity, onboardingState, isLoggedIn, termsAccepted }

export const {
  updateAuthenticatedStore,
  updateIdentityRefStore,
  updateIdentityStore,
  updateTermsStore,
  updateAuthFlowLoadingStore,
  updateConfigStore,
  updateFeesStore,
} = slice.actions
export default slice.reducer
