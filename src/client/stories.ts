import { Dispatch } from 'redux'
import { applyFilterAction, getProposalsAction, selectProposalAction } from './actions'
import { ProposalsFilter } from './reducer'
import { Proposal } from '../api/data/proposal'

export const initClientDashboardStory = (dispatch: Dispatch): void => {
  Promise.all([
    startFetchingProposals(dispatch)
  ]).catch(console.error)
}

let _FetchingProposalsInterval = null

export const startFetchingProposals = (dispatch: Dispatch): void => {
  const fetch = async () => {
    await dispatch(getProposalsAction())
  }

  if (!_FetchingProposalsInterval)
    _FetchingProposalsInterval = setInterval(fetch, 30 * 1000)

  fetch().catch(console.error)
}

export const stopFetchingProposals = (): void => {
  clearInterval(_FetchingProposalsInterval)
  _FetchingProposalsInterval = null
}

export const selectProposalStory = (dispatch: Dispatch, proposal: Proposal) => dispatch(selectProposalAction(proposal))

export const applyFilterStory = (dispatch: Dispatch, filter: ProposalsFilter) => dispatch(applyFilterAction(filter))

