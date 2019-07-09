import typeToReducer from 'type-to-reducer'
import _ from 'lodash'
import {
  ACCESS_POLICY,
  IDENTITY,
  IDENTITY_PAYOUT,
  NAT_STATUS,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  SERVICE_SESSIONS,
  SET_PROVIDER_STATE,
  STARTED_SERVICES,
  TRAFFIC_OPTION,
  UPDATE_IDENTITY,
  UPDATE_REFERRAL_CODE,
} from './constants'
import { Action } from 'redux-actions'
import {
  AccessPolicy,
  ConsumerLocation,
  Identity,
  IdentityPayout,
  NatStatus,
  ServiceInfo,
  ServiceSession
} from 'mysterium-vpn-js'
import { ServerSentEventTypes, ServerSentPayload } from '../utils/serverSentEvents'

export interface ProviderState {
  identity?: Identity,
  payout?: IdentityPayout & {
    loading?: boolean
  },
  originalLocation?: ConsumerLocation,
  accessPolicy?: AccessPolicy,
  trafficOption?: TrafficOptions
  residentialConfirm?: boolean,
  state?: any,
  startedServices?: ServiceInfo[],
  startedServicePending?: boolean,
  sessions?: ServiceSession[],
  natStatus?: NatStatus,

  [key: string]: any
}

export enum TrafficOptions {
  SAFE = 'safe',
  ALL = 'all'
}

export const providerInitState = {
  trafficOption: TrafficOptions.SAFE,
  residentialConfirm: false,
}

export default typeToReducer({
  [UPDATE_IDENTITY]: {
    FULFILLED: (state, action: Action<Identity>) => ({
      ...state,
      payout: {
        ...state.payout,
        ethAddress: _.get(action, 'meta.ethAddress'),
      },
    }),
  },

  [ORIGINAL_LOCATION]: {
    FULFILLED: (state, action: Action<ConsumerLocation>) => ({
      ...state,
      originalLocation: action.payload,
    }),
  },

  [IDENTITY]: {
    FULFILLED: (state, action: Action<Identity>) => ({
      ...state,
      identity: action.payload,
    }),
  },

  [IDENTITY_PAYOUT]: {
    PENDING: (state) => ({
      ...state,
      payout: {
        loading: true,
      },
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      payout: {
        loading: false,
      },
    }),
    FULFILLED: (state, action: Action<IdentityPayout>) => ({
      ...state,
      payout: {
        ethAddress: _.get(action, 'payload.ethAddress'),
        referralCode: _.get(action, 'payload.referralCode'),
        loading: false,
      },
      referral: {
        loading: false,
      },
    }),
  },

  [UPDATE_REFERRAL_CODE]: {
    PENDING: (state) => ({
      ...state,
      referral: {
        loading: true,
      },
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      referral: {
        loading: false,
      },
    }),
    FULFILLED: (state, action: Action<IdentityPayout>) => {
      return {
        ...state,
        payout: {
          ...state.payout,
          referralCode: _.get(action, 'meta.referralCode'),
        },
        referral: {
          loading: false,
        },
      }
    },
  },

  [ACCESS_POLICY]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    accessPolicy: action.payload,
  }),

  [SET_PROVIDER_STATE]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    state: {
      ...state.state,
      ...action.payload,
    },
  }),

  [TRAFFIC_OPTION]: (state, action: Action<TrafficOptions>) => ({
    ...state,
    trafficOption: action.payload,
  }),

  [RESIDENTIAL_CONFIRM]: (state, action: Action<boolean>) => ({
    ...state,
    residentialConfirm: action.payload,
  }),

  [NAT_STATUS]: (state, action: Action<boolean>) => ({
    ...state,
    natStatus: action.payload,
  }),

  [SERVICE_SESSIONS]: (state, action: Action<ServiceSession[] | null>) => ({
    ...state,
    sessions: action.payload,
  }),

  [STARTED_SERVICES]: {
    PENDING: (state, { meta }) => ({
      ...state,
      startedServicePending: meta && meta.pending,
    }),
    REJECTED: (state) => ({
      ...state,
      startedServicePending: false,
    }),
    FULFILLED: (state, action: Action<ServiceInfo[]>) => ({
      ...state,
      startedServices: action.payload,
      startedServicePending: false,
    }),
  },

  [`sse/${ServerSentEventTypes.STATE_CHANGE}`]: (state, action: Action<ServerSentPayload>) => {
    const { natStatus = null, serviceInfo = null, sessions = null } = action.payload || {}

    return {
      ...state,
      natStatus: natStatus ? _.assign(state.natStatus, natStatus) : state.natStatus,
      startedServices: serviceInfo,
      sessions: sessions,
    }
  },

}, providerInitState)
