import { AnyAction, Dispatch, Store } from 'redux'
import { getCurrentAccessPolicy, getNatStatus, getServiceSessions } from './api'
import {
  getIdentityPayoutAction,
  getServiceAction,
  setAccessPolicyAction,
  setIdentityAction,
  setLocationAction,
  setNatStatusAction,
  setProviderStateAction,
  setServiceSessionAction,
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
import { ApiError } from '../api/api-error'
import apiSubmissionError from '../utils/apiSubmissionError'

export const initProviderStory = (store: Store) => {

  Promise.all([
    fetchLocationStory(store.dispatch),
    fetchIdentityStory(store.dispatch)
  ]).catch(console.error)

  fetchServiceStory(store.dispatch)
    .then((result: any) => {
      const service: Service = result && result.value
      return (service && service.id)
        ? startVpnStateFetchingStory(store.dispatch, service)
        : startAccessPolicyFetchingStory(store.dispatch)
    })
    .catch(console.error)
}

export const setGeneralError = (dispatch, e) => dispatch(setProviderStateAction({
  generalError: e.message
}))

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const result: AnyAction = await dispatch(setIdentityAction())
  const identity: Identity = result.value

  if (identity) {
    Promise.resolve(dispatch(unlocksIdentityAction({
      id: identity.id
      // passphrase: '123'
    }))).catch((e: ApiError) => setGeneralError(dispatch, e))
  }

  Promise.resolve(dispatch(getIdentityPayoutAction(identity))).catch((e: ApiError) => setGeneralError(dispatch, e))

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

  const service: Service = await Promise
    .resolve(dispatch(startServiceAction({ providerId, type, accessPolicyId, options })))
    .then((result: any) => result && result.value)
    .catch(error => {
      setGeneralError(dispatch, error)
      return null
    })

  if (service && service.id) {
    dispatch(push(NAV_PROVIDER_DASHBOARD))
    startVpnStateFetchingStory(dispatch, service).catch(console.error)
    stopAccessPolicyFetchingStory()
  }
}

export const stopVpnServerStory = async (dispatch: Dispatch, service: Service) => {
  if (!service) {
    return
  }

  stopVpnStateFetchingStory(dispatch)
  await dispatch(stopServiceAction(service))

  dispatch(push(NAV_PROVIDER_SETTINGS))

  return startAccessPolicyFetchingStory(dispatch)
}

let _VpnStateInterval

export const startVpnStateFetchingStory = async (dispatch: Dispatch, service: Service) => {

  const fetch = async () => Promise.all([
    dispatch(setNatStatusAction(await getNatStatus())),
    dispatch(setServiceSessionAction(await getServiceSessions(service)))
  ])

  fetch().catch(console.error)

  if (!_VpnStateInterval) {
    _VpnStateInterval = setInterval(fetch, 3000)
  }
}

export const stopVpnStateFetchingStory = (dispatch) => {
  clearInterval(_VpnStateInterval)
  dispatch(setNatStatusAction(null))
  dispatch(setServiceSessionAction(null))
  _VpnStateInterval = null
}

export const updateIdentitiesStory = async (
  dispatch: Dispatch, data: {passphrase: string, id: string, ethAddress: string}) => {
  const { id, passphrase, ethAddress } = data
  try {
    await dispatch(unlocksIdentityAction({ id, passphrase }))
    await dispatch(updateIdentitiesAction({ id, ethAddress }))
    await dispatch(setProviderStateAction({ isWalletEditMode: false }))
  } catch (e) {
    apiSubmissionError('walletAddress')(e)
  }
}

