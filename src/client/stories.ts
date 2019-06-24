import { Dispatch } from 'redux'
import {
  applyFilterAction,
  getConnectionAction,
  getConnectionIpAction,
  getConnectionStatisticsAction,
  getProposalsAction,
  getProposalsCountsAction,
  selectProposalAction,
  setFavoriteProposalsAction,
  startConnectionAction,
  stopConnectionAction
} from './actions'
import { ProposalsFilter } from './reducer'
import { Proposal } from '../api/data/proposal'
import { ConnectionStatus, Identity } from 'mysterium-vpn-js'
import { DispatchResult } from '../types'
import { ConnectionStatusResponse } from 'mysterium-vpn-js/lib/connection/status'
import favoriteProposals from '../utils/favoriteProposals'

export const initClientDashboardStory = (dispatch: Dispatch, filter?: ProposalsFilter): void => {
  startFetchingProposals(dispatch, filter)
  fetchFavoriteProposals(dispatch)
  Promise.resolve(getConnectionStory(dispatch))
    .then((result: DispatchResult) => {
      if (result.value && result.value.proposal) {
        selectProposalStory(dispatch, result.value.proposal)
        onStartConnectionStory(dispatch).catch((e) => {
          if (process.env.NODE_ENV !== 'production') {
            console.error(e)
          }
        })
      }
    })
    .catch((e) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e)
      }
    })

}

export const fetchFavoriteProposals = (dispatch: Dispatch) => dispatch(setFavoriteProposalsAction(favoriteProposals.favoriteProposals))

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
  fetch().catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
}

export const stopFetchingProposals = (): void => {
  clearInterval(_FetchingProposalsInterval)
  _FetchingProposalsInterval = null
}

export const applyFilterStory = (dispatch: Dispatch, filter: ProposalsFilter) => {
  _FetchingProposalsFilter = filter
  Promise.resolve(dispatch(getProposalsAction(_FetchingProposalsFilter))).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
  dispatch(selectProposalAction())

  return dispatch(applyFilterAction(filter))
}

export const selectProposalStory = (dispatch: Dispatch, proposal: Proposal) => dispatch(selectProposalAction(proposal))

export const startConnectionStory = async (dispatch: Dispatch, proposal: Proposal, identity: Identity) => {
  await dispatch(startConnectionAction(proposal, identity))
  stopFetchingProposals()
  onStartConnectionStory(dispatch).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
}

export const onStartConnectionStory = async (dispatch: Dispatch) => Promise.all([
  getConnectionIpStory(dispatch),
  startFetchingConnectionStatistics(dispatch)
])

export const onStopConnectionStory = async (dispatch: Dispatch) => Promise.all([
  stopFetchingConnectionStatistics()
])

export const getConnectionStory = (dispatch: Dispatch) => dispatch(getConnectionAction())

export const stopConnectionStory = async (dispatch: Dispatch) => {
  const connection: ConnectionStatusResponse = await Promise.resolve(dispatch(stopConnectionAction()))
    .then((result: DispatchResult) => result && result.value)
    .catch((e) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e)
      }
    })

  startFetchingProposals(dispatch, _FetchingProposalsFilter)
  onStopConnectionStory(dispatch).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })

  if (!(connection && connection.status === ConnectionStatus.NOT_CONNECTED)) {
    const interval = setInterval(async () => Promise.resolve(getConnectionStory(dispatch))
      .then((result: DispatchResult) => result && result.value && result.value.status)
      .then((status: ConnectionStatus) => {
        if (status === ConnectionStatus.NOT_CONNECTED) {
          clearInterval(interval)
        }
      })
      .catch((e) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error(e)
        }
      }), 1000)
  }
}

export const getConnectionIpStory = (dispatch: Dispatch) => dispatch(getConnectionIpAction())

// FetchingConnectionStatistics
let _FetchingConnectionStatisticsInterval = null

export const startFetchingConnectionStatistics = (dispatch: Dispatch): void => {

  const fetch = async () => {
    await dispatch(getConnectionStatisticsAction())
  }

  fetch().catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })

  if (!_FetchingConnectionStatisticsInterval) {
    _FetchingConnectionStatisticsInterval = setInterval(fetch, 5 * 1000)
  }
}

export const stopFetchingConnectionStatistics = (): void => {
  clearInterval(_FetchingConnectionStatisticsInterval)
  _FetchingConnectionStatisticsInterval = null
}
