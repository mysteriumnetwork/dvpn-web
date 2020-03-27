import typeToReducer from 'type-to-reducer'
import _ from 'lodash'
import {
  ACCESS_POLICY,
  IDENTITY,
  IDENTITY_PAYOUT,
  IDENTITY_DETAILS,
  NAT_STATUS,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  SERVICE_SESSIONS,
  SET_PROVIDER_STATE,
  STARTED_SERVICES,
  TRAFFIC_OPTION,
  UPDATE_EMAIL,
  UPDATE_IDENTITY,
  UPDATE_REFERRAL_CODE,
} from './constants'
import { Action } from 'redux-actions'
import {
  AccessPolicy,
  ConsumerLocation,
  Identity,
  IdentityRef,
  IdentityPayout,
  NatStatus,
  ServiceInfo,
  ServiceSession,
  AppState,
  SSEEventType,
} from 'mysterium-vpn-js'

export interface ProviderState {
  identity?: IdentityRef,
  identityDetails?: Identity
  payout?: IdentityPayout & {
    loading?: boolean
    loaded?: boolean
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

export default typeToReducer<ProviderState>({
  [ORIGINAL_LOCATION]: {
    FULFILLED: (state, action: Action<ConsumerLocation>) => ({
      ...state,
      originalLocation: action.payload,
    }),
  },

  [IDENTITY]: {
    FULFILLED: (state, action: Action<IdentityRef>) => ({
      ...state,
      identity: action.payload,
    }),
  },

  [IDENTITY_DETAILS]: {
    FULFILLED: (state, action: Action<Identity>) => ({
      ...state,
      identityDetails: action.payload,
    })
  },

  [IDENTITY_PAYOUT]: {
    PENDING: (state) => ({
      ...state,
      payout: ({
        ...(state.payout || {}),
        loading: true,
      }) as any,
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      payout: {
        loading: false,
        loaded: true,
      } as any,
    }),
    FULFILLED: (state, action: Action<IdentityPayout>) => ({
      ...state,
      payout: {
        ...action.payload,
        loading: false,
        loaded: true,
      } as any,
      referral: {
        loading: false,
      },
    }),
  },

  [UPDATE_IDENTITY]: {
    FULFILLED: (state, action: Action<IdentityRef>) => ({
      ...state,
      payout: {
        ...(state.payout || {}),
        ethAddress: _.get(action, 'meta.ethAddress'),
      } as any,
    }),
  },

  [UPDATE_REFERRAL_CODE]: {
    FULFILLED: (state, action: Action<IdentityPayout>) => {
      return {
        ...state,
        payout: {
          ...(state.payout || {}),
          referralCode: _.get(action, 'meta.referralCode'),
        } as any
      }
    },
  },

  [UPDATE_EMAIL]: {
    FULFILLED: (state, action: Action<IdentityPayout>) => {
      return {
        ...state,
        payout: {
          ...state.payout,
          email: _.get(action, 'meta.email'),
        }
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

  [NAT_STATUS]: (state, action: Action<NatStatus>) => ({
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

  [`sse/${SSEEventType.AppStateChange}`]: (state, action: Action<AppState>) => {
    const { identities = [], natStatus = null, services = null, sessions = null } = action.payload || {}

    return {
      ...state,
      identityDetails: state.identity.id ? _.find(identities, {'id':   state.identity.id}) : null,
      natStatus: natStatus ? _.assign(state.natStatus, natStatus) : state.natStatus,
      startedServices: services,
      sessions: sessions,
    }
  },

}, providerInitState)
