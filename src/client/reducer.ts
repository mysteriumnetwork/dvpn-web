import typeToReducer from 'type-to-reducer'
import {
  APPLY_FILTER,
  ASK_PROPOSAL,
  CONNECTION,
  CONNECTION_IP,
  CONNECTION_STATISTICS,
  FAVORITE_PROPOSALS,
  PROPOSALS,
  PROPOSALS_COUNTS,
  SELECT_PROPOSAL
} from './constants'
import { Action, ActionMeta } from 'redux-actions'
import { ProposalsCountsInterface } from '../utils/proposalsCounts'
import { ConnectionIp, ConnectionStatus, Proposal } from 'mysterium-vpn-js'
import { ConnectionStatusResponse } from 'mysterium-vpn-js/lib/connection/status'
import { ConnectionStatistics } from 'mysterium-vpn-js/lib/connection/statistics'

export interface ProposalsFilter {
  country?: string
  type?: string
  favorite?: boolean
}

export interface ClientState {
  isAskSortProposal: boolean,
  filter?: ProposalsFilter
  proposals?: Proposal[],
  proposalsPending?: boolean,
  proposalSelected?: Proposal,
  proposalsCount?: number,
  proposalsFavoritesCount?: number,
  proposalsByCountryCounts?: Map<string, number>,
  proposalsByTypeCounts?: Map<string, number>,
  connectionFailed?: any
  connectionStatus?: ConnectionStatus
  connectionSessionId?: string
  connectionIp?: string
  connectionStatistics?: ConnectionStatistics,
  favoriteProposals?: Proposal[]
}

export const clientInitState = {
  proposals: [],
  isAskSortProposal: true
}

export default typeToReducer({

  [PROPOSALS]: {
    PENDING: (state) => ({ ...state, proposalsPending: true }),
    REJECTED: (state) => ({ ...state, proposalsPending: false }),
    FULFILLED: (state, action: Action<Proposal[]>) => ({
      ...state,
      proposals: action.payload,
      proposalsPending: false,
    })
  },

  [PROPOSALS_COUNTS]: {
    FULFILLED: (state, action: Action<ProposalsCountsInterface>) => ({
      ...state,
      ...action.payload,
    })
  },

  [ASK_PROPOSAL]: (state, action: Action<boolean>) => ({
    ...state,
    isAskSortProposal: Boolean(action.payload)
  }),

  [SELECT_PROPOSAL]: (state, action: Action<Proposal>) => ({
    ...state,
    proposalSelected: action.payload,
  }),

  [APPLY_FILTER]: (state, action: Action<ProposalsFilter>) => ({
    ...state,
    filter: action.payload,
  }),

  [CONNECTION]: {
    PENDING: (state, action: ActionMeta<Proposal, any>) => ({
      ...state,
      connectionStatus: action.meta || state.connectionStatus
    }),
    REJECTED: (state, action: Action<Error>) => ({
      ...state,
      connectionStatus: ConnectionStatus.NOT_CONNECTED,
      connectionFailed: action.payload
    }),
    FULFILLED: (state, action: Action<ConnectionStatusResponse>) => {
      const { status, sessionId } = action.payload

      return {
        ...state,
        connectionPending: false,
        connectionStatus: status,
        connectionSessionId: sessionId
      }
    }
  },

  [CONNECTION_IP]: {
    FULFILLED: (state, action: Action<ConnectionIp>) => {
      const { ip } = action.payload

      return {
        ...state,
        connectionIp: ip
      }
    }
  },

  [CONNECTION_STATISTICS]: {
    FULFILLED: (state, action: Action<ConnectionStatistics>) => {
      return {
        ...state,
        connectionStatistics: action.payload
      }
    }
  },

  [FAVORITE_PROPOSALS]: (state, action: Action<Proposal[]>) => ({
    ...state,
    favoriteProposals: action.payload
  })

}, clientInitState)
