import { Proposal } from 'mysterium-vpn-js'

export default function compareProposals(a: Proposal, b: Proposal): boolean {
  return a && b && (a.providerId === b.providerId) && (a.serviceType === b.serviceType)
}
