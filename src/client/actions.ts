import { createAction } from 'redux-actions'
import {
  getConnection,
  getProposalsByFilter,
  getProposalsWithConnectCounts,
  startConnection,
  stopConnection
} from './api'
import { APPLY_FILTER, CONNECTION, PROPOSALS, PROPOSALS_COUNTS, SELECT_PROPOSAL } from './constants'
import { ConnectionStatus } from 'mysterium-vpn-js'

export const getProposalsCountsAction = createAction(PROPOSALS_COUNTS, getProposalsWithConnectCounts)

export const getProposalsAction = createAction(PROPOSALS, getProposalsByFilter)

export const selectProposalAction = createAction(SELECT_PROPOSAL)

export const applyFilterAction = createAction(APPLY_FILTER)

export const startConnectionAction = createAction(CONNECTION, startConnection, () => ConnectionStatus.CONNECTING)

export const stopConnectionAction = createAction(CONNECTION, stopConnection, () => ConnectionStatus.DISCONNECTING)

export const getConnectionAction = createAction(CONNECTION, getConnection)


