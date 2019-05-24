import { createAction } from 'redux-actions'
import { getProposalsWithConnectCounts } from './api'
import { PROPOSALS } from './constants'

export const getProposals = createAction(PROPOSALS, getProposalsWithConnectCounts)
