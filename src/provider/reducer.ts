import typeToReducer from 'type-to-reducer'
import { ACCESS_POLICY, ORIGINAL_LOCATION, RESIDENTIAL_CONFIRM, TRAFFIC_OPTION } from './actions'
import { Action } from 'redux-actions'
import { OriginalLocation } from '../api/data/original-location'
import { AccessPolicy } from '../api/data/access-policy'

export interface ProviderReducer {
  originalLocation: OriginalLocation,
  accessPolicy: AccessPolicy,
  trafficOption: TrafficOptions
  residentialConfirm: boolean
}

export enum TrafficOptions {
  SAFE = 'safe',
  ALL = 'all'
}

export default typeToReducer({
  [ORIGINAL_LOCATION]: (state, action: Action<OriginalLocation>) => ({
    ...state,
    originalLocation: action.payload
  }),

  [ACCESS_POLICY]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    accessPolicy: action.payload
  }),

  [TRAFFIC_OPTION]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    trafficOption: action.payload
  }),

  [RESIDENTIAL_CONFIRM]: (state, action: Action<AccessPolicy>) => ({
    ...state,
    residentialConfirm: action.payload
  })
}, {
  trafficOption: TrafficOptions.SAFE,
  residentialConfirm: false
})
