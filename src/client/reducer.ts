import typeToReducer from 'type-to-reducer'
import { APPLY_FILTER, PROPOSALS, SELECT_PROPOSAL } from './constants'
import { Action } from 'redux-actions'
import { Proposal } from '../api/data/proposal'
import { proposalsCounts } from '../utils/proposalsCounts'

export interface ProposalsFilter {
  country?: string
  type?: string
  favorite?: boolean
}

export interface ClientReducer {
  filter?: ProposalsFilter
  proposals?: Proposal[],
  proposalsPending?: boolean,
  proposalSelected?: Proposal,
  proposalsCount: number,
  proposalsFavoritesCount: number,
  proposalsByCountryCounts: Map<string, number>,
  proposalsByTypeCounts: Map<string, number>
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
      ...proposalsCounts(action.payload),
      proposalsPending: false,
    })
  },

  [SELECT_PROPOSAL]: (state, action: Action<Proposal>) => ({
    ...state,
    proposalSelected: action.payload,
  }),

  [APPLY_FILTER]: (state, action: Action<ProposalsFilter>) => ({
    ...state,
    filter: action.payload,
  })

}, clientInitState)
