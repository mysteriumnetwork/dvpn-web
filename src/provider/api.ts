import { AccessPolicy } from '../api/data/access-policy'
import { tequilaApi } from '../api'
import { OriginalLocation } from '../api/data/original-location'
import { Identity } from '../api/data/identity'
import { Service, ServiceOptions } from '../api/data/service'
import { ServiceParams } from '../api/data/service-params'
import { IdentityPayout } from '../api/data/identity-payout'

export const getCurrentAccessPolicy = async (): Promise<AccessPolicy | null> => {
  try {
    const accessPolicies = await tequilaApi.accessPolicies()

    if (accessPolicies && accessPolicies.length > 0) {
      return accessPolicies[0]
    }
  } catch (e) {
    console.error('Failed fetching first access policy', e)
  }

  return null
}

export const getFirstIdentity = async (): Promise<Identity | null> => {
  try {
    const identities = await tequilaApi.identities()

    if (identities && identities.length > 0) {
      return identities[0]
    }
  } catch (e) {
    console.error('Failed fetching first identity', e)
  }

  return null
}

export const getOriginalLocation = async (): Promise<OriginalLocation | null> => {
  try {
    return await tequilaApi.location()
  } catch (e) {
    console.error('Failed fetching location', e)
  }

  return null
}

export interface StartServiceInterface {
  providerId: string,
  type: string,
  accessPolicyId?: string,
  options?: ServiceOptions
}

export const startService = async (data: StartServiceInterface): Promise<Service> => {
  const { providerId, type, options, accessPolicyId } = data

  const request: ServiceParams = {
    providerId,
    type,
    options
  }

  if (accessPolicyId) {
    request.accessPolicies = { ids: [accessPolicyId] }
  }

  return await tequilaApi.serviceStart(request)
}

export const stopService = async (service: Service): Promise<any> => {
  return service && await tequilaApi.serviceStop(service.id)
}

export const getCurrentService = async (): Promise<Service | null> => {
  try {
    const services = await tequilaApi.services()

    if (services && services.length > 0) {
      return services[0]
    }
  } catch (e) {
    console.error('Failed fetching first access policy', e)
  }

  return null
}

export const getIdentityPayout = async (identity: Identity): Promise<IdentityPayout> => {
  if (!(identity && identity.id)) return

  return await tequilaApi.identityPayout(identity.id)
}

export const updateIdentity = async (data: { id: string, ethAddress: string }): Promise<void> => {
  const { id, ethAddress } = data
  await tequilaApi.updateIdentityPayout(id, ethAddress)
}

export const unlocksIdentity = async (data: { id: string, passphrase: string }): Promise<void> => {
  const { id, passphrase } = data
  await tequilaApi.unlocksIdentity(id, passphrase)
}
