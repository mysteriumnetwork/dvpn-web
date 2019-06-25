import { tequilapiClient } from '../api'
import { Proposal } from 'mysterium-vpn-js'
import { ConnectionIp, ConnectionRequest, ConnectionStatus, Identity, ProposalQuery } from 'mysterium-vpn-js'
import { ConnectionStatusResponse } from 'mysterium-vpn-js/lib/connection/status'
import { ProposalsFilter } from './reducer'
import { proposalsCounts, ProposalsCountsInterface } from '../utils/proposalsCounts'
import _ from 'lodash'
import { ConnectionStatistics } from 'mysterium-vpn-js/lib/connection/statistics'
import favoriteProposals from '../utils/favoriteProposals'

export const getProposalsWithConnectCounts = async (): Promise<ProposalsCountsInterface> => {
  try {
    const proposals = await tequilapiClient.findProposals({ fetchConnectCounts: true })

    return proposalsCounts(proposals)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return {}
}

export const getProposalsByFilter = async (filter: ProposalsFilter): Promise<Proposal[]> => {
  try {
    const options: ProposalQuery = { fetchConnectCounts: true }

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
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsByFilter:', e)
    }
  }

  return []
}

export const startConnection = async (proposal: Proposal, identity: Identity): Promise<ConnectionStatusResponse> => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('startConnection', { proposal, identity })
  }
  try {
    const request: ConnectionRequest = {
      consumerId: identity.id,
      providerId: proposal.providerId,
      serviceType: proposal.serviceType
    }

    return await tequilapiClient.connectionCreate(request)
  } catch (e) {
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
    if (process.env.NODE_ENV !== 'production') {
      console.log('getProposalsWithConnectCounts:', e)
    }
  }

  return {}
}

