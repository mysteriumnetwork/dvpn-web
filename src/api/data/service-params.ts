import { ServiceOptions } from './service'

export interface ServiceParams {
  providerId: string
  type: string
  accessPolicies?: object
  options?: ServiceOptions
}
