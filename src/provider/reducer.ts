import typeToReducer from 'type-to-reducer'
import _ from 'lodash'
import {
  ACCESS_POLICY,
  IDENTITY,
  IDENTITY_PAYOUT,
  NAT_STATUS,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  SERVER_SERVICE_UPDATE_STATUS,
  SERVICE_SESSIONS,
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
import { NatStatus } from '../api/data/nat-status'
import { Service } from '../api/data/service'
import { ServiceSession } from '../api/data/service-session'

export interface ProviderReducer {
  identity?: Identity,
  payout?: IdentityPayout & {
    loading?: boolean
  },
  originalLocation?: OriginalLocation,
  accessPolicy?: AccessPolicy,
  trafficOption?: TrafficOptions
  residentialConfirm?: boolean,
  state?: any,
  startedService?: Service,
  startedServicePending?: boolean,
  sessions?: ServiceSession[],
  natStatus?: NatStatus
}

export enum TrafficOptions {
  SAFE = 'safe',
  ALL = 'all'
}

export const providerInitState = {
  trafficOption: TrafficOptions.SAFE,
  residentialConfirm: false,
  state: {}
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

  [NAT_STATUS]: (state, action: Action<boolean>) => ({
    ...state,
    natStatus: action.payload
  }),

  [SERVICE_SESSIONS]: (state, action: Action<ServiceSession[] | null>) => ({
    ...state,
    sessions: action.payload
  }),

  [STARTED_SERVICE]: {
    PENDING: (state, { meta }) => ({
      ...state,
      startedServicePending: meta && meta.pending
    }),
    REJECTED: (state) => ({
      ...state,
      startedServicePending: false
    }),
    FULFILLED: (state, action: Action<any>) => ({
      ...state,
      startedService: action.payload,
      startedServicePending: false
    })
  },
  [SERVER_SERVICE_UPDATE_STATUS]: (state, action: Action<{ payload: { id: string, status: string } }>) => {
    const { id, status } = _.get(action, 'payload', null)
    if (_.get(state, 'startedService.id') === id && id !== undefined) {
      state = {
        ...state,
        startedService: {
          ..._.get(state, 'startedService'),
          status,
        }
      }
    }
    return state
  }

}, providerInitState)
