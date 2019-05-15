import typeToReducer from "type-to-reducer";
import { ACCESS_POLICY, ORIGINAL_LOCATION, RESIDENTIAL_CONFIRM, STARTED_SERVICE, TRAFFIC_OPTION } from "./actions";
import { Action } from "redux-actions";
import { OriginalLocation } from "../api/data/original-location";
import { AccessPolicy } from "../api/data/access-policy";

export interface ProviderReducer {
  originalLocation: OriginalLocation,
  accessPolicy: AccessPolicy,
  trafficOption: TrafficOptions
  residentialConfirm: boolean,
  startedService: any
}

export enum TrafficOptions {
  SAFE = "safe",
  ALL = "all"
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

  [TRAFFIC_OPTION]: (state, action: Action<TrafficOptions>) => ({
    ...state,
    trafficOption: action.payload
  }),

  [RESIDENTIAL_CONFIRM]: (state, action: Action<boolean>) => ({
    ...state,
    residentialConfirm: action.payload
  }),

  [STARTED_SERVICE]: (state, action: Action<any>) => ({
    ...state,
    startedService: action.payload
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
      tartedServicePending: false
    })
  }

}, {
  trafficOption: TrafficOptions.SAFE,
  residentialConfirm: false
});
