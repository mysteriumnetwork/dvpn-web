export interface ProposalParams {
  providerId?: string // id of provider proposals
  serviceType?: string  // the service type of the proposal. Possible values are "openvpn", "wireguard" and "noop"
  accessPolicyId?: string  // the access policy id to filter the proposals by
  accessPolicySource?: string  // the access policy source to filter the proposals by
  fetchConnectCounts?: boolean  // if set to true, fetches the connection success metrics for nodes. False by default.
}
