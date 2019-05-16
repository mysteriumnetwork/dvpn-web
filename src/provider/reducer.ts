import typeToReducer from 'type-to-reducer'
import _ from 'lodash'
import {
  ACCESS_POLICY,
  IDENTITY,
  IDENTITY_PAYOUT,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  SET_PROVIDER_STATE,
  STARTED_SERVICE,
  TRAFFIC_OPTION,
  UPDATE_IDENTITY
} from './constants'
import { Action } from 'redux-actions'
import { OriginalLocation } from '../api/data/original-location'
import { AccessPolicy } from '../api/data/access-policy'
import { Identity } from '../api/data/identity'
import { IdentityPayout } from '../api/data/identity-payout'

export interface ProviderReducer {
  identity?: Identity,
  payout?: {
    ethAddress?: string,
    loading?: boolean,
  },
  originalLocation?: OriginalLocation,
  accessPolicy?: AccessPolicy,
  trafficOption?: TrafficOptions
  residentialConfirm?: boolean,
  startedService?: any,
  state?: any,
  startedServiceReject?: any,
  startedServicePending?: boolean
}

export enum TrafficOptions {
  SAFE = 'safe',
  ALL = 'all'
}

export default typeToReducer({
  [UPDATE_IDENTITY]: {
    FULFILLED: (state, action: Action<Identity>) => ({
      ...state,
      payout: {
        ...state.payout,
        ethAddress: _.get(action, 'meta.ethAddress')
      }

    })
  },

  [ORIGINAL_LOCATION]: {
    FULFILLED: (state, action: Action<OriginalLocation>) => ({
      ...state,
      originalLocation: action.payload
    })
  },

  [IDENTITY]: {
    FULFILLED: (state, action: Action<Identity>) => ({
      ...state,
      identity: action.payload
    })
  },

  [IDENTITY_PAYOUT]: {
    PENDING: (state) => ({
      ...state,
      payout: {
        loading: true
      }
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      payout: {
        loading: false
      }
    }),
    FULFILLED: (state, action: Action<IdentityPayout>) => ({
      ...state,
      payout: {
        ethAddress: _.get(action, 'payload.eth_address'),
        loading: false
      }
    })
  },

  [ACCESS_POLICY]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    accessPolicy: action.payload
  }),

  [SET_PROVIDER_STATE]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    state: {
      ...state.state,
      ...action.payload
    }
  }),

  [TRAFFIC_OPTION]: (state, action: Action<TrafficOptions>) => ({
    ...state,
    trafficOption: action.payload
  }),

  [RESIDENTIAL_CONFIRM]: (state, action: Action<boolean>) => ({
    ...state,
    residentialConfirm: action.payload
  }),

  [STARTED_SERVICE]: {
    PENDING: (state) => ({
      ...state,
      startedServiceReject: null,
      startedServicePending: true
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      startedServiceReject: action.payload,
      startedServicePending: false
    }),
    FULFILLED: (state, action: Action<any>) => ({
      ...state,
      startedService: action.payload,
      startedServiceReject: null,
      startedServicePending: false
    })
  }

}, {
  trafficOption: TrafficOptions.SAFE,
  residentialConfirm: false,
  state: {}
})
