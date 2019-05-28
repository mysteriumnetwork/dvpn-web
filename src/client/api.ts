import { tequilapiClient } from '../api'
import { Proposal } from '../api/data/proposal'
import { ConnectionRequest, ConnectionStatus, Identity, ProposalQuery } from 'mysterium-vpn-js'
import { ConnectionStatusResponse } from 'mysterium-vpn-js/lib/connection/status'
import { ProposalsFilter } from './reducer'
import { proposalsCounts, ProposalsCountsInterface } from '../utils/proposalsCounts'
import _ from 'lodash'

export const getProposalsWithConnectCounts = async (): Promise<ProposalsCountsInterface> => {
  try {
    const proposals = await tequilapiClient.findProposals({ fetchConnectCounts: true })

    return proposalsCounts(proposals)
  } catch (e) {
    console.log('getProposalsWithConnectCounts:', e)
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

    return proposals
  } catch (e) {
    console.log('getProposalsByFilter:', e)
  }

  return []
}

export const startConnection = async (proposal: Proposal, identity: Identity): Promise<ConnectionStatusResponse> => {
  console.log('startConnection', { proposal, identity })
  try {
    const request: ConnectionRequest = {
      consumerId: identity.id,
      providerId: proposal.providerId,
      serviceType: proposal.serviceType
    }

    return await tequilapiClient.connectionCreate(request)
  } catch (e) {
    console.log('getProposalsWithConnectCounts:', e)
  }

  return { status: ConnectionStatus.NOT_CONNECTED }
}

export const getConnection = async (): Promise<ConnectionStatusResponse> => {
  try {
    return await tequilapiClient.connectionStatus()
  } catch (e) {
    console.log('getProposalsWithConnectCounts:', e)
  }

  return { status: ConnectionStatus.NOT_CONNECTED }
}

export const stopConnection = async (): Promise<ConnectionStatusResponse> => {
  try {
    await tequilapiClient.connectionCancel()
  } catch (e) {
    console.log('getProposalsWithConnectCounts:', e)
  }

  return await getConnection()
}
