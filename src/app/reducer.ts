import typeToReducer from 'type-to-reducer'
import { HEALTH_CHECK } from './constants'
import { Action } from 'redux-actions'
import { NodeHealthcheck } from 'mysterium-vpn-js'

export const appInitState: AppState = {}

export interface AppState {
  node?: NodeHealthcheck

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
}, appInitState)
