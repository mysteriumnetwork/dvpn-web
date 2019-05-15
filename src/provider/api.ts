import { AccessPolicy } from '../api/data/access-policy'
import { tequilaApi } from '../api'
import { OriginalLocation } from '../api/data/original-location'
import { Identity } from '../api/data/identity'

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
