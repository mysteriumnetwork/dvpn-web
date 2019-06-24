import { AccessPolicy } from '../api/data/access-policy'
import { tequilaApi, tequilapiClient } from '../api'
import { OriginalLocation } from '../api/data/original-location'
import { Identity } from '../api/data/identity'
import { Service, ServiceOptions } from '../api/data/service'
import { IdentityPayout } from '../api/data/identity-payout'
import { NatStatus } from '../api/data/nat-status'
import { ServiceSession } from '../api/data/service-session'
import { ServiceInfo, ServiceRequest } from 'mysterium-vpn-js'

export const getCurrentAccessPolicy = async (): Promise<AccessPolicy | null> => {
  try {
    const accessPolicies = await tequilaApi.accessPolicies()

    if (accessPolicies && accessPolicies.length > 0) {
      return accessPolicies[0]
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed fetching first access policy', e)
    }
  }

  return null
}

export const getCurrentIdentity = async (passphrase: string = ''): Promise<Identity | null> => {
  try {
    return await tequilaApi.me(passphrase)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed fetching first identity', e)
    }
  }

  return null
}

export const getOriginalLocation = async (): Promise<OriginalLocation | null> => {
  try {
    return await tequilaApi.location()
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed fetching location', e)
    }
  }

  return null
}

export const getNatStatus = async (): Promise<NatStatus | null> => {
  try {
    return await tequilaApi.natStatus()
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed fetching NatStatus', e)
    }
  }

  return null
}

export interface StartServiceInterface {
  providerId: string,
  type: string,
  accessPolicyId?: string,
  options?: ServiceOptions
}

export const startService = async (data: StartServiceInterface): Promise<ServiceInfo[]> => {
  const { providerId, type, options, accessPolicyId } = data

  const request: ServiceRequest = {
    providerId,
    type,
    options
  }

  if (accessPolicyId) {
    request.accessPolicies = { ids: [accessPolicyId] }
  }

  const service = await tequilapiClient.serviceStart(request)

  return service ? [service] : undefined
}

export const stopService = async (service: Service): Promise<ServiceInfo[] | void> => {
  try {
    return service && await tequilapiClient.serviceStop(service.id)
  } catch (e) {
    return getServiceList()
  }
}

export const getServiceSessions = async (service: Service): Promise<ServiceSession[]> => {
  return service && await tequilaApi.serviceSessions(service.id)
}

export const getServiceList = async (): Promise<ServiceInfo[] | null> => {
  try {
    return await tequilapiClient.serviceList()

  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed fetching first access policy', e)
    }
  }

  return null
}

export const getIdentityPayout = async (identity: Identity): Promise<IdentityPayout> => {
  if (!(identity && identity.id)) {
    return
  }

  return await tequilaApi.identityPayout(identity.id)
}

export const updateIdentity = async (data: { id: string, ethAddress: string }): Promise<void> => {
  const { id, ethAddress } = data
  await tequilaApi.updateIdentityPayout(id, ethAddress)
}

export const updateReferralCode = async (data: { id: string, referralCode: string }): Promise<void> => {
  const { id, referralCode } = data
  await tequilaApi.updateReferralCode(id, referralCode)
}

export const unlocksIdentity = async (data: { id: string, passphrase: string }): Promise<void> => {
  const { id, passphrase = '' } = data
  await tequilaApi.unlocksIdentity(id, passphrase)
}

