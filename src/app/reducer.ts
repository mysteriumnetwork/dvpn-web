import typeToReducer from 'type-to-reducer'
import { CONFIG_DEFAULT, CONFIG_DATA, HEALTH_CHECK, REPORT_ISSUE } from './constants'
import { Action } from 'redux-actions'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'

export const appInitState: AppState = {}

export interface AppState {
  node?: NodeHealthcheck
  configDefaults?: any
  configData?: any

  [key: string]: any
}

export default typeToReducer({
  [HEALTH_CHECK]: {
    PENDING: (state) => ({
      ...state,
      healthCheckPending: true,
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      healthCheckPending: false,
    }),
    FULFILLED: (state, action: Action<NodeHealthcheck>) => ({
      ...state,
      healthCheckPending: false,
      node: action.payload
    }),
  },

  [REPORT_ISSUE]: {
    PENDING: (state) => ({
      ...state,
      reportIssuePending: true,
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      reportIssuePending: false,
    }),
    FULFILLED: (state, action: Action<NodeHealthcheck>) => ({
      ...state,
      reportIssuePending: false,
    }),
  },

  [CONFIG_DEFAULT]: {
    PENDING: (state) => ({
      ...state,
      configDefaults: { pending: true }
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      configDefaults: {}
    }),
    FULFILLED: (state, action: Action<Config>) => ({
      ...state,
      configDefaults: (action.payload && action.payload.data) || {},
    }),
  },

  [CONFIG_DATA]: {
    PENDING: (state) => ({
      ...state,
      configData: { pending: true }
    }),
    REJECTED: (state, action: Action<any>) => ({
      ...state,
      configData: {}
    }),
    FULFILLED: (state, action: Action<Config>) => ({
      ...state,
      configData: (action.payload && action.payload.data) || {},
    }),
  }
}, appInitState)
