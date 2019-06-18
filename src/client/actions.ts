import { createAction } from 'redux-actions'
import {
  getConnection,
  getConnectionIp,
  getConnectionStatistics,
  getProposalsByFilter,
  getProposalsWithConnectCounts,
  startConnection,
  stopConnection
} from './api'
import {
  APPLY_FILTER,
  CONNECTION,
  CONNECTION_IP,
  CONNECTION_STATISTICS,
  PROPOSALS,
  PROPOSALS_COUNTS,
  SELECT_PROPOSAL,
  TOGGLE_ASK_PROPOSAL
} from './constants'
import { ConnectionStatus } from 'mysterium-vpn-js'

export const getProposalsCountsAction = createAction(PROPOSALS_COUNTS, getProposalsWithConnectCounts)

export const getProposalsAction = createAction(PROPOSALS, getProposalsByFilter)

export const selectProposalAction = createAction(SELECT_PROPOSAL)

export const applyFilterAction = createAction(APPLY_FILTER)

export const startConnectionAction = createAction(CONNECTION, startConnection, () => ConnectionStatus.CONNECTING)

export const stopConnectionAction = createAction(CONNECTION, stopConnection, () => ConnectionStatus.DISCONNECTING)

export const getConnectionAction = createAction(CONNECTION, getConnection)

export const getConnectionIpAction = createAction(CONNECTION_IP, getConnectionIp)

export const getConnectionStatisticsAction = createAction(CONNECTION_STATISTICS, getConnectionStatistics)

export const toggleAskProposal = createAction(TOGGLE_ASK_PROPOSAL, (isAskSortProposal) => ({ isAskSortProposal }))
