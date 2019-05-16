import typeToReducer from 'type-to-reducer'
import {
  ACCESS_POLICY,
  IDENTITY,
  IDENTITY_PAYOUT,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
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
  originalLocation?: OriginalLocation,
  accessPolicy?: AccessPolicy,
  trafficOption?: TrafficOptions
  residentialConfirm?: boolean,
  startedService?: any,
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
      identity: action.payload
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
    FULFILLED: (state, action: Action<IdentityPayout>) => ({
      ...state,
      payout: action.payload
    })
  },

  [ACCESS_POLICY]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    accessPolicy: action.payload
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
  residentialConfirm: false
})
