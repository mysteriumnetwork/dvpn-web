import typeToReducer from 'type-to-reducer'
import { PROPOSALS } from './constants'
import { Action } from 'redux-actions'
import { Proposal } from '../api/data/proposal'

export interface ClientReducer {
  proposals?: Proposal[],
  proposalsPending?: boolean,
}

export const clientInitState = {
  proposals: []
}

export default typeToReducer({
  [PROPOSALS]: {
    PENDING: (state) => ({
      ...state,
      proposalsPending: true
    }),
    REJECTED: (state) => ({
      ...state,
      proposalsPending: false
    }),
    FULFILLED: (state, action: Action<Proposal[]>) => ({
      ...state,
      proposals: action.payload,
      proposalsPending: false
    })
  }
}, clientInitState)
