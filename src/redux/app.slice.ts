/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import termsPackageJson from '@mysteriumnetwork/terms/package.json'
import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import {
  BeneficiaryTxStatus,
  ChainSummary,
  FeesResponse,
  Identity,
  IdentityBeneficiaryResponse,
  IdentityRef,
  NodeHealthcheck,
} from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { BENEFICIARY_TX_STATUS_EMPTY, FEES_RESPONSE_EMPTY, HEALTHCHECK_EMPTY } from '../constants/instances'
import identities from '../commons/identities'

const { isUnregistered } = identities

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
  auth: Auth
  terms: Terms
  config: Config
  defaultConfig: Config
  fees: FeesResponse
  chainSummary: ChainSummary
  beneficiary: IdentityBeneficiaryResponse
  beneficiaryTxStatus: BeneficiaryTxStatus
  healthCheckResponse: NodeHealthcheck
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
  fees: FEES_RESPONSE_EMPTY,
  config: {
    data: {},
  },
  defaultConfig: {
    data: {},
  },
  chainSummary: {
    chains: {
      [-1]: 'Unknown',
    },
    currentChain: -1,
  },
  beneficiary: {
    beneficiary: '',
    isChannelAddress: false,
  },
  beneficiaryTxStatus: BENEFICIARY_TX_STATUS_EMPTY,
  healthCheckResponse: HEALTHCHECK_EMPTY,
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
    updateBeneficiaryStore: (state, action) => {
      state.beneficiary = action.payload
    },
    updateDefaultConfigStore: (state, action) => {
      state.defaultConfig = action.payload
    },
    updateBeneficiaryTxStatusStore: (state, action) => {
      state.beneficiaryTxStatus = action.payload
    },
    updateHealthCheckResponseStore: (state, action) => {
      state.healthCheckResponse = action.payload
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
  updateTermsStore,
  updateAuthFlowLoadingStore,
  updateConfigStore,
  updateDefaultConfigStore,
  updateFeesStore,
  updateChainSummaryStore,
  updateBeneficiaryStore,
  updateBeneficiaryTxStatusStore,
  updateHealthCheckResponseStore,
} = slice.actions

export default slice.reducer
