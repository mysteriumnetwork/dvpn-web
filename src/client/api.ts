import { tequilaApi } from '../api'
import { Proposal } from '../api/data/proposal'

export const getProposalsWithConnectCounts = async (): Promise<Proposal[]> => {
  try {
    return await tequilaApi.proposals({ fetchConnectCounts: true })
  } catch (e) {
    console.log('getProposalsWithConnectCounts:', e)
  }

  return []
}
