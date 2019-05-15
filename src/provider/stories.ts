import { Dispatch, Store } from 'redux'
import { getFirstAccessPolicy, getFirstIdentity, getOriginalLocation, startService, stopService } from './api'
import { setAccessPolicyAction, setIdentityAction, setLocationAction, setStartedServiceAction } from './actions'
import { ProviderReducer, TrafficOptions } from './reducer'
import { Service, ServiceOptions, ServiceTypes } from '../api/data/service'

export const initProviderStory = (store: Store) => {

  Promise.all([
    fetchLocationStory(store.dispatch),
    fetchIdentityStory(store.dispatch)
  ]).catch(console.error)

  startAccessPolicyFetchingStory(store.dispatch).catch(console.error)
}

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const identity = await getFirstIdentity()
  dispatch(setIdentityAction(identity))
}

export const fetchLocationStory = async (dispatch: Dispatch) => {
  const location = await getOriginalLocation()
  dispatch(setLocationAction(location))
}

let _accessPolicyInterval

export const startAccessPolicyFetchingStory = async (dispatch: Dispatch) => {

  let failedCount = 0
  const ALLOWED_FAILS = 10000

  const fetch = async () => {
    const accessPolicy = await getFirstAccessPolicy()
    if (accessPolicy) {
      failedCount = 0
      dispatch(setAccessPolicyAction(accessPolicy))
      return
    }

    failedCount++

    if (failedCount > ALLOWED_FAILS) {
      dispatch(setAccessPolicyAction(null))
    }
  }

  fetch().catch(console.error)

  if (!_accessPolicyInterval) {
    _accessPolicyInterval = setInterval(fetch, 3000)
  }
}

export const stopAccessPolicyFetchingStory = () => {
  clearInterval(_accessPolicyInterval)
}

export const startVpnServerStory = async (
  dispatch: Dispatch, provider: ProviderReducer) => {
  const providerId = provider.identity && provider.identity.id
  const type = ServiceTypes.OPENVPN ///TODO: tmp
  const accessPolicyId = (provider.trafficOption === TrafficOptions.SAFE && provider.accessPolicy)
    ? provider.accessPolicy.id
    : undefined
  const options: ServiceOptions = undefined

  const promise = startService(providerId, type, accessPolicyId, options)

  const service: Service = await dispatch(setStartedServiceAction(promise))

  console.log('startVpnServerStory:', service)

  if (service && service.id) {
    stopAccessPolicyFetchingStory()
  }

}

export const stopVpnServerStory = async (dispatch: Dispatch, service: Service) => {
  if (!service) return

  const promise = stopService(service)

  await dispatch(setStartedServiceAction(promise))

  return startAccessPolicyFetchingStory(dispatch)
}
