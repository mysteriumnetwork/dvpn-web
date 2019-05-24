import { createAction } from 'redux-actions'
import { getProposalsWithConnectCounts } from './api'
import { APPLY_FILTER, PROPOSALS, SELECT_PROPOSAL } from './constants'
import { ProposalsFilter } from './reducer'
import { Proposal } from '../api/data/proposal'

export const getProposalsAction = createAction<Promise<Proposal[]>>(PROPOSALS, getProposalsWithConnectCounts)

export const selectProposalAction = createAction<Proposal>(SELECT_PROPOSAL)

export const applyFilterAction = createAction<ProposalsFilter>(APPLY_FILTER)


