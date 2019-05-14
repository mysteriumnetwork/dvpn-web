import { AccessPolicy } from './access-policy'
import { Proposal } from './proposal'

export interface Service {
  accessPolicies?: AccessPolicy[]
  id?: string
  options?: ServiceOptions
  proposal?: Proposal
  providerId?: string
  status?: string
  type?: string
}

export interface ServiceOptions {
  port?: number
  protocol?: string

  [key: string]: any
}

export enum ServiceTypes {
  OPENVPN = 'openvpn',
  WIREGUARD = 'wireguard',
  NOOP = 'noop'
}
