import { AccessPolicy } from './access-policy'
import { ServiceDefinition } from './service-definition'

export interface Proposal {
  accessPolicies?: AccessPolicy[]
  id: number
  metrics?: any
  providerId: string
  serviceType: string
  serviceDefinition: ServiceDefinition

}
