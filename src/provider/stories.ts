import { AnyAction, Dispatch, Store } from 'redux'
import { getCurrentAccessPolicy, getNatStatus } from './api'
import {
  getServiceAction,
  setAccessPolicyAction,
  setIdentityAction,
  setIdentityPayoutAction,
  setLocationAction,
  setNatStatus,
  setProviderStateAction,
  startServiceAction,
  stopServiceAction,
  unlocksIdentityAction,
  updateIdentitiesAction
} from './actions'
import { ProviderReducer, TrafficOptions } from './reducer'
import { Service, ServiceOptions, ServiceTypes } from '../api/data/service'
import { Identity } from '../api/data/identity'
import { push } from 'connected-react-router'
import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from './provider.links'

export const initProviderStory = (store: Store) => {

  Promise.all([
    fetchLocationStory(store.dispatch),
    fetchIdentityStory(store.dispatch)
  ]).catch(console.error)

  fetchServiceStory(store.dispatch)
    .then((result: any) => {
      const service: Service = result && result.value
      return (service && service.id)
        ? startNatStatusFetchingStory(store.dispatch)
        : startAccessPolicyFetchingStory(store.dispatch)
    })
    .catch(console.error)
}

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const result: AnyAction = await dispatch(setIdentityAction())
  const identity: Identity = result.value

  console.log('fetchIdentityStory', identity)

  if (identity) {
    Promise.resolve(await dispatch(unlocksIdentityAction({ id: identity.id })))
  }

  Promise.resolve(dispatch(setIdentityPayoutAction(identity))).catch(console.error)

  return identity
}

export const fetchLocationStory = async (dispatch: Dispatch) => dispatch(setLocationAction())

export const fetchServiceStory = async (dispatch: Dispatch) => dispatch(getServiceAction())

let _accessPolicyInterval

export const startAccessPolicyFetchingStory = async (dispatch: Dispatch) => {

  let failedCount = 0
  const ALLOWED_FAILS = 10000

  const fetch = async () => {
    const accessPolicy = await getCurrentAccessPolicy()
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
  _accessPolicyInterval = null
}

export const startVpnServerStory = async (dispatch: Dispatch, provider: ProviderReducer) => {
  const providerId = provider.identity && provider.identity.id
  const type = ServiceTypes.OPENVPN ///TODO: tmp
  const accessPolicyId = (provider.trafficOption === TrafficOptions.SAFE && provider.accessPolicy)
    ? provider.accessPolicy.id
    : undefined
  const options: ServiceOptions = undefined

  const result: any = await dispatch(startServiceAction({ providerId, type, accessPolicyId, options }))
  const service: Service = result && result.value

  if (service && service.id) {
    dispatch(push(NAV_PROVIDER_DASHBOARD))
    startNatStatusFetchingStory(dispatch).catch(console.error)
    stopAccessPolicyFetchingStory()
  }
}

export const stopVpnServerStory = async (dispatch: Dispatch, service: Service) => {
  if (!service) {
    return
  }

  stopNatStatusFetchingStory(dispatch)
  await dispatch(stopServiceAction(service))

  dispatch(push(NAV_PROVIDER_SETTINGS))

  return startAccessPolicyFetchingStory(dispatch)
}

let _natStatusInterval

export const startNatStatusFetchingStory = async (dispatch: Dispatch) => {

  const fetch = async () => dispatch(setNatStatus(await getNatStatus()))

  fetch().catch(console.error)

  if (!_natStatusInterval) {
    _natStatusInterval = setInterval(fetch, 3000)
  }
}

export const stopNatStatusFetchingStory = (dispatch) => {
  clearInterval(_natStatusInterval)
  dispatch(setNatStatus(null))
  _natStatusInterval = null
}

export const updateIdentitiesStory = async (
  dispatch: Dispatch, data: {passphrase: string, id: string, ethAddress: string}) => {
  const { id, passphrase, ethAddress } = data
  await dispatch(unlocksIdentityAction({ id, passphrase }))
  await dispatch(updateIdentitiesAction({ id, ethAddress }))
  await dispatch(setProviderStateAction({ isWalletEditMode: false }))
}

