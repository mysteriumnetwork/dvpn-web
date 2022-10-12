/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  BeneficiaryTxStatus,
  ChainSummary,
  FeesResponse,
  IdentityBeneficiaryResponse,
  IdentityRef,
  NatTypeResponse,
  NodeHealthcheck,
} from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js'
import {
  BENEFICIARY_TX_STATUS_EMPTY,
  FEES_RESPONSE_EMPTY,
  HEALTHCHECK_EMPTY,
  NAT_TYPE_RESPONSE_EMPTY,
} from '../constants/instances'

export interface Auth {
  authenticated: boolean
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
  natType: NatTypeResponse
  chatOpened: boolean
  minimumRegistrationAmountWei: string
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
  natType: NAT_TYPE_RESPONSE_EMPTY,
  chatOpened: false,
  minimumRegistrationAmountWei: '0',
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
    updateLoadingStore: (state, action) => {
      state.loading = action.payload
    },
    updateConfigStore: (state, action) => {
      state.config = action.payload
    },
    updateFeesStore: (state, action: PayloadAction<FeesResponse>) => {
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
    updateNatTypeResponseStore: (state, action) => {
      state.natType = action.payload
    },
    updateChatOpenedStore: (state, action) => {
      state.chatOpened = action.payload
    },
    updateMinimumRegistrationAmountWeiStore: (state, action) => {
      state.minimumRegistrationAmountWei = action.payload
    },
  },
})

export const {
  updateAuthenticatedStore,
  updateIdentityRefStore,
  updateTermsStore,
  updateLoadingStore,
  updateConfigStore,
  updateDefaultConfigStore,
  updateFeesStore,
  updateChainSummaryStore,
  updateBeneficiaryStore,
  updateBeneficiaryTxStatusStore,
  updateHealthCheckResponseStore,
  updateNatTypeResponseStore,
  updateChatOpenedStore,
  updateMinimumRegistrationAmountWeiStore,
} = slice.actions

export default slice.reducer
