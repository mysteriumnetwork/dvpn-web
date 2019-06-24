import { Dispatch, Store } from 'redux'
import { getCurrentAccessPolicy } from './api'
import {
  getIdentityPayoutAction,
  getServicesAction,
  setAccessPolicyAction,
  setIdentityAction,
  setLocationAction,
  setProviderStateAction,
  startServiceAction,
  stopServiceAction,
  updateIdentitiesAction,
  updateReferralAction,
} from './actions'
import { ProviderState, TrafficOptions } from './reducer'
import { Service, ServiceOptions, ServiceTypes } from '../api/data/service'
import { Identity } from '../api/data/identity'
import { push } from 'connected-react-router'
import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from './provider.links'
import { ApiError } from '../api/api-error'
import apiSubmissionError from '../utils/apiSubmissionError'
import { DispatchResult } from '../types'
import serverSentEvents, { ServerSentEventTypes } from '../utils/serverSentEvents'
import _ from 'lodash'
import { RootState } from '../rootState.type'
import { ServiceInfo } from 'mysterium-vpn-js'
import { OriginalLocation } from '../api/data/original-location'

export const initProviderStory = (store: Store<RootState>) => {
  Promise.all([
    fetchLocationStory(store.dispatch),
    fetchIdentityStory(store.dispatch),
    fetchServiceStory(store.dispatch),
    startAccessPolicyFetchingStory(store.dispatch)
  ]).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })

  serverSentEvents.subscribe(ServerSentEventTypes.STATE_CHANGE, (payload) => {
      const { serviceInfo = [] } = payload || null
      const startedServices: ServiceInfo[] = _.get(store.getState(), 'provider.startedServices')

      const shouldFetch = !(startedServices && startedServices.length) && (serviceInfo && serviceInfo.length)

      Promise.resolve(shouldFetch ? fetchServiceStory(store.dispatch) : serviceInfo)
        .then((serviceInfo) => {
          return (serviceInfo && serviceInfo.length)
            ? onServiceStarted(store.dispatch).catch((e) => {
              if (process.env.NODE_ENV !== 'production') {
                console.error(e)
              }
            })
            : onServiceStopped(store.dispatch).catch((e) => {
              if (process.env.NODE_ENV !== 'production') {
                console.error(e)
              }
            })
        })
        .catch(() => undefined)
    }
  )
}

export const setGeneralError = (dispatch, e) => dispatch(setProviderStateAction({
  generalError: e.message
}))

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const result: DispatchResult<Identity> = await dispatch(setIdentityAction())
  const identity: Identity = result.value

  if (identity) {
    Promise.resolve(dispatch(getIdentityPayoutAction(identity)))
      .catch((e: ApiError) => {
        if (!e.isNotFound) {
          setGeneralError(dispatch, e)
        }
      })
  }

  return identity
}

export const fetchLocationStory = async (dispatch: Dispatch) => Promise.resolve(dispatch(setLocationAction()))
  .then((result: DispatchResult<OriginalLocation>) => result.value)

export const fetchServiceStory = async (dispatch: Dispatch) => Promise.resolve(dispatch(getServicesAction()))
  .then((result: DispatchResult<ServiceInfo[]>) => result.value)

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

  fetch().catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })

  if (!_accessPolicyInterval) {
    _accessPolicyInterval = setInterval(fetch, 3000)
  }
}

export const stopAccessPolicyFetchingStory = () => {
  clearInterval(_accessPolicyInterval)
  _accessPolicyInterval = null
}

export const startVpnServerStory = async (dispatch: Dispatch, provider: ProviderState) => {
  const providerId = provider.identity && provider.identity.id
  const type = ServiceTypes.OPENVPN ///TODO: tmp
  const accessPolicyId = (provider.trafficOption === TrafficOptions.SAFE && provider.accessPolicy)
    ? provider.accessPolicy.id
    : undefined
  const options: ServiceOptions = undefined

  const services: Service[] = await Promise
    .resolve(dispatch(startServiceAction({ providerId, type, accessPolicyId, options })))
    .then((result: DispatchResult<Service[]>) => result && result.value)
    .catch(error => {
      setGeneralError(dispatch, error)
      return null
    })

  if (services && services.length) {
    dispatch(push(NAV_PROVIDER_DASHBOARD))
    onServiceStarted(dispatch).catch((e) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e)
      }
    })
  }
}

const onServiceStarted = async (dispatch: Dispatch) => Promise.all([
  stopAccessPolicyFetchingStory()
])

const onServiceStopped = async (dispatch: Dispatch) => Promise.all([
  startAccessPolicyFetchingStory(dispatch).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
])

export const stopVpnServerStory = async (dispatch: Dispatch, service: Service) => {
  if (!service) {
    return
  }

  await Promise.resolve(dispatch(stopServiceAction(service))).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })

  dispatch(push(NAV_PROVIDER_SETTINGS))
  onServiceStopped(dispatch).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
}

export const updateIdentitiesStory = async (
  dispatch: Dispatch, data: { passphrase: string, id: string, ethAddress: string }) => {
  const { id, ethAddress } = data
  try {
    await dispatch(updateIdentitiesAction({ id, ethAddress }))
    await dispatch(setProviderStateAction({ isWalletEditMode: false }))
  } catch (e) {
    apiSubmissionError('walletAddress')(e)
  }
}

export const updateReferralStory = async (
  dispatch: Dispatch, data: { passphrase: string, id: string, referralCode: string }) => {
  const { id, referralCode } = data
  try {
    await dispatch(updateReferralAction({ id, referralCode }))
    await dispatch(setProviderStateAction({ isReferralEditMode: false }))
  } catch (e) {
    apiSubmissionError('walletAddress')(e)
  }
}
