import { tequilapiClient } from '../api'
import {
  ConnectionIp,
  ConnectionRequest,
  ConnectionStatus,
  ConnectionStatusResponse,
  ConnectionStatistics,
  IdentityRef,
  Proposal,
  ProposalQuery
} from 'mysterium-vpn-js'
import { ProposalsFilter } from './reducer'
import { proposalsCounts, ProposalsCountsInterface } from '../utils/proposalsCounts'
import _ from 'lodash'
import favoriteProposals from '../utils/favoriteProposals'
import unauthorized from '../utils/unauthorized'

const accountantId = "0x0214281cf15c1a66b51990e2e65e1f7b7c363318"

export const getProposalsWithConnectCounts = async (): Promise<ProposalsCountsInterface> => {
  try {
    const proposals = await tequilapiClient.findProposals({ fetchMetrics: true })

    return proposalsCounts(proposals)
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return {}
}

export const getProposalsByFilter = async (filter: ProposalsFilter): Promise<Proposal[]> => {
  try {
    const options: ProposalQuery = { fetchMetrics: true }

    if (filter && filter.type) {
      options.serviceType = filter.type
    }

    const proposals = await tequilapiClient.findProposals(options)

    if (filter && filter.country) {
      return proposals.filter(value => _.get(value, 'serviceDefinition.locationOriginate.country') === filter.country)
    }

    if (filter && filter.favorite) {
      return proposals.filter(value => favoriteProposals.isFavorite(value))
    }

    return proposals
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsByFilter:', e)
    }
  }

  return []
}

export const startConnection = async (proposal: Proposal, identity: IdentityRef): Promise<ConnectionStatusResponse> => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('startConnection', { proposal, identity })
  }
  try {
    const request: ConnectionRequest = {
      consumerId: identity.id,
      providerId: proposal.providerId,
      accountantId,
      serviceType: proposal.serviceType
    }

    return await tequilapiClient.connectionCreate(request)
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return { status: ConnectionStatus.NOT_CONNECTED }
}

export const getConnection = async (): Promise<ConnectionStatusResponse> => {
  try {
    return await tequilapiClient.connectionStatus()
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return { status: ConnectionStatus.NOT_CONNECTED }
}

export const stopConnection = async (): Promise<ConnectionStatusResponse> => {
  try {
    await tequilapiClient.connectionCancel()
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return await getConnection()
}

export const getConnectionStatistics = async (): Promise<ConnectionStatistics> => {
  try {
    return await tequilapiClient.connectionStatistics()
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return null
}

export const getConnectionIp = async (): Promise<ConnectionIp> => {
  try {
    return await tequilapiClient.connectionIp()
  } catch (e) {
    unauthorized.onError(e)
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return {}
}

