import { HttpAdapter } from './http'
import { OriginalLocation } from './data/original-location'
import { AccessPolicy, AccessPolicyResponse } from './data/access-policy'
import { ServiceParams } from './data/service-params'
import { Service } from './data/service'
import { NatStatus } from './data/nat-status'
import { Identity, IdentityResponse } from './data/identity'
import { IdentityPayout } from './data/identity-payout'

export interface TequilaApiInterface {

  identities(): Promise<Identity[]>

  location(timeout?: number): Promise<OriginalLocation>

  accessPolicies(): Promise<AccessPolicy[]>

  services(timeout?: number): Promise<Service[]>

  serviceStart(params: ServiceParams, timeout?: number): Promise<Service>

  serviceStop(id: string): Promise<void>

  natStatus(): Promise<NatStatus>

  identityPayout(id: string): Promise<IdentityPayout>

  updateIdentityPayout(id: string, ethAddress: string): Promise<void>

  unlocksIdentity(id: string, passphrase: string): Promise<void>
}

export class TequilaApi implements TequilaApiInterface {

  constructor(protected http: HttpAdapter) {

  }

  public async identities(): Promise<Identity[]> {
    const response = await this.http.get<IdentityResponse>('identities')
    if (!response) {
      throw new Error('Identity response body is missing')
    }

    return (response && response.identities) || []
  }

  public async accessPolicies(): Promise<AccessPolicy[]> {
    const response = await this.http.get<AccessPolicyResponse>('access-policies')
    if (!response) {
      throw new Error('Access policies response body is missing')
    }

    return (response && response.entries) || []
  }

  public async location(timeout?: number): Promise<OriginalLocation> {
    const location = await this.http.get<OriginalLocation>(
      'location',
      undefined,
      { timeout })
    if (!location) {
      throw new Error('Location response body is missing')
    }
    return location
  }

  public async services(): Promise<Service[]> {
    const services = await this.http.get<Service[]>('services')
    if (!services) {
      throw new Error('Service response body is missing')
    }

    return services || []
  }

  public async serviceStart(
    params: ServiceParams, timeout?: number): Promise<Service> {
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
    return this.http.get<NatStatus>('nat/status')
  }

  public async identityPayout(id: string): Promise<IdentityPayout> {
    const payout = await this.http.get(`identities/${id}/payout`)
    if (!payout) {
      throw new Error('Identity payout response body is missing')
    }
    return payout
  }

  public async updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    await this.http.put(`identities/${id}/payout`, { ethAddress })
  }

  public async unlocksIdentity(id: string, passphrase: string): Promise<void> {
    await this.http.put(`identities/${id}/unlock`, { passphrase })
  }

}
