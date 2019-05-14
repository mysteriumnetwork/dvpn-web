import { HttpAdapter } from './http'
import { OriginalLocation } from './data/original-location'
import { AccessPolicy } from './data/access-policy'
import { ServiceParams } from './data/service-params'
import { Service } from './data/service'
import { NatStatus } from './data/nat-status'

export interface TequilaApiInterface {

  location(timeout?: number): Promise<OriginalLocation>

  accessPolicies(): Promise<AccessPolicy[]>

  serviceStart(params: ServiceParams, timeout?: number): Promise<Service>

  serviceStop(id: string): Promise<void>

  natStatus(): Promise<NatStatus>

  updateIdentityPayout(id: string, ethAddress: string): Promise<void>
}

export class TequilaApi implements TequilaApiInterface {

  constructor(protected http: HttpAdapter) {

  }

  public async accessPolicies(): Promise<AccessPolicy[]> {
    const response = await this.http.get('access-policies')
    if (!response) {
      throw new Error('Access policies response body is missing')
    }

    return response && response.entries
  }

  public async location(timeout?: number): Promise<OriginalLocation> {
    const location = await this.http.get<OriginalLocation>('location', undefined, { timeout })
    if (!location) {
      throw new Error('Location response body is missing')
    }
    return location
  }

  public async serviceStart(params: ServiceParams, timeout?: number): Promise<Service> {
    const { providerId, type, accessPolicies, options } = params

    const service = await this.http.post<Service>(
      'services',
      { providerId, type, accessPolicies, options },
      { timeout }
    )

    if (!service) {
      throw new Error('Service creation response body is missing')
    }

    return service
  }

  public async serviceStop(id: string): Promise<void> {
    await this.http.delete(`services/${id}`)
  }

  public async natStatus(): Promise<NatStatus> {
    return await this.http.get<NatStatus>('nat/status')
  }

  public async updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    await this.http.put(`identities/${id}/payout`, { ethAddress })
  }

}
