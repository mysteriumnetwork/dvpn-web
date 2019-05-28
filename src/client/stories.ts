import { Dispatch } from 'redux'
import {
  applyFilterAction,
  getConnectionAction,
  getProposalsAction,
  getProposalsCountsAction,
  selectProposalAction,
  startConnectionAction,
  stopConnectionAction
} from './actions'
import { ProposalsFilter } from './reducer'
import { Proposal } from '../api/data/proposal'
import { Identity } from 'mysterium-vpn-js'

export const initClientDashboardStory = (dispatch: Dispatch, filter?: ProposalsFilter): void => {
  startFetchingProposals(dispatch, filter)
  Promise.resolve(getConnectionStory(dispatch)).catch(console.error)
}

export const destroyClientDashboardStory = (dispatch: Dispatch): void => {
  stopFetchingProposals()
}

// FetchingProposals
let _FetchingProposalsInterval = null
let _FetchingProposalsFilter: ProposalsFilter

export const startFetchingProposals = (dispatch: Dispatch, filter: ProposalsFilter): void => {
  stopFetchingProposals()

  _FetchingProposalsFilter = filter
  const fetch = async () => Promise.all([
    dispatch(getProposalsCountsAction()),
    dispatch(getProposalsAction(_FetchingProposalsFilter))
  ])

  _FetchingProposalsInterval = setInterval(fetch, 30 * 1000)
  fetch().catch(console.error)
}

export const stopFetchingProposals = (): void => {
  clearInterval(_FetchingProposalsInterval)
  _FetchingProposalsInterval = null
}

export const applyFilterStory = (dispatch: Dispatch, filter: ProposalsFilter) => {
  _FetchingProposalsFilter = filter
  Promise.resolve(dispatch(getProposalsAction(_FetchingProposalsFilter))).catch(console.error)
  dispatch(selectProposalAction())

  return dispatch(applyFilterAction(filter))
}

export const selectProposalStory = (dispatch: Dispatch, proposal: Proposal) => dispatch(selectProposalAction(proposal))

export const startConnectionStory = async (dispatch: Dispatch, proposal: Proposal, identity: Identity) => {
  await dispatch(startConnectionAction(proposal, identity))
  stopFetchingProposals()
}

export const getConnectionStory = (dispatch: Dispatch) => dispatch(getConnectionAction())

export const stopConnectionStory = async (dispatch: Dispatch) => {
  const {} = dispatch(stopConnectionAction())
}

