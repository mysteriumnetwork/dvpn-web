import { AccessPolicy } from '../api/data/access-policy'
import { tequilaApi } from '../api'
import { OriginalLocation } from '../api/data/original-location'
import { Identity } from '../api/data/identity'
import { Service, ServiceOptions } from '../api/data/service'
import { ServiceParams } from '../api/data/service-params'

export const getFirstAccessPolicy = async (): Promise<AccessPolicy | null> => {
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

export const startService = async (
  providerId: string,
  type: string,
  accessPolicyId?: string,
  options?: ServiceOptions): Promise<any> => {

  const params: ServiceParams = {
    providerId,
    type,
    options
  }

  if (accessPolicyId) {
    params.accessPolicies = { ids: [accessPolicyId] }
  }

  return await tequilaApi.serviceStart(params)
}

export const stopService = async (service: Service): Promise<any> => {
  return service && await tequilaApi.serviceStop(service.id)
}

export const updateIdentity = async (data: { id: string, ethAddress: string }): Promise<void> => {
  const { id, ethAddress } = data
  await tequilaApi.updateIdentityPayout(id, ethAddress)
}

export const unlocksIdentity = async (data: { id: string, passphrase: string }): Promise<void> => {
  const { id, passphrase } = data
  await tequilaApi.unlocksIdentity(id, passphrase)
}
