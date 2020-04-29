import { Dispatch } from 'redux'
import { getCurrentAccessPolicy } from './api'
import {
  getIdentityPayoutAction,
  getServicesAction,
  setAccessPolicyAction,
  setIdentityAction,
  setLocationAction,
  setProviderStateAction,
  setTrafficOptionAction,
  startServiceAction,
  stopServiceAction,
  updateEmailAction,
  updateIdentitiesAction,
  updateReferralAction,
} from './actions'
import { ProviderState, TrafficOptions } from './reducer'
import { ServiceOptions, ServiceTypes } from '../api/data/service'
import { ConsumerLocation, IdentityPayout, IdentityRef, ServiceInfo, SSEEventType } from 'mysterium-vpn-js'
import { push } from 'connected-react-router'
import apiSubmissionError from '../utils/apiSubmissionError'
import { ConfigData, DispatchResult } from '../types'
import serverSentEvents from '../utils/serverSentEvents'
import { TequilapiError } from 'mysterium-vpn-js/lib/tequilapi-error'
import { updateUserConfigAction } from '../app/actions'

export const initServerEventsStory = (dispatch: Dispatch, services: any) => {
  serverSentEvents.connect()
  serverSentEvents.subscribe(SSEEventType.AppStateChange, (payload) => {
      const { serviceInfo = [] } = payload || null
      const startedServices: ServiceInfo[] = services
      const shouldFetch = !(startedServices && startedServices.length) && (serviceInfo && serviceInfo.length)
      Promise.resolve(shouldFetch ? fetchServiceStory(dispatch) : serviceInfo)
        .then((serviceInfo) => {
          return (serviceInfo && serviceInfo.length)
            ? onServiceStarted(dispatch).catch((e) => {
              if (process.env.NODE_ENV !== 'production') {
                console.error(e)
              }
            })
            : onServiceStopped(dispatch).catch((e) => {
              if (process.env.NODE_ENV !== 'production') {
                console.error(e)
              }
            })
        })
        .catch(() => undefined)
    },
  )
}

export const initAppFetchStory = async (dispatch: Dispatch) => Promise.all([
  fetchLocationStory(dispatch),
  fetchIdentityStory(dispatch),
  fetchServiceStory(dispatch),
])

export const initProviderStory = (dispatch: Dispatch) => {
  startAccessPolicyFetchingStory(dispatch)
  fetchServiceStory(dispatch).catch((e) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  })
}

export const destroyProvidersStory = (dispatch: Dispatch) => {
  stopAccessPolicyFetchingStory()
}

export const setGeneralError = (dispatch, e) => dispatch(setProviderStateAction({
  generalError: e.message,
}))

export const fetchIdentityStory = async (dispatch: Dispatch) => {
  const result: DispatchResult<IdentityRef> = await dispatch(setIdentityAction())
  const identity: IdentityRef = result.value

  if (identity) {
    Promise.resolve(dispatch(getIdentityPayoutAction(identity)))
      .catch((e: TequilapiError) => {
        if (!e.isNotFoundError) {
          setGeneralError(dispatch, e)
        }
      })
  }

  return identity
}

export const fetchLocationStory = async (dispatch: Dispatch) => Promise.resolve(dispatch(setLocationAction()))
  .then((result: DispatchResult<ConsumerLocation>) => result.value)

export const fetchServiceStory = async (dispatch: Dispatch) => Promise.resolve(dispatch(getServicesAction()))
  .then((result: DispatchResult<ServiceInfo[]>) => result.value)

let _accessPolicyInterval

export const startAccessPolicyFetchingStory = (dispatch: Dispatch) => {

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

  // Starts services with persisted defaults in order to get same results as device restarts
  const services: ServiceInfo[] = []
  services.push(await Promise
    .resolve(dispatch(startServiceAction({ providerId, type: ServiceTypes.OPENVPN })))
    .then((result: DispatchResult<ServiceInfo[]>) => result && result.value)
    .catch(error => {
      setGeneralError(dispatch, error)
      return null
    }))

  services.push(await Promise
    .resolve(dispatch(startServiceAction({ providerId, type: ServiceTypes.WIREGUARD })))
    .then((result: DispatchResult<ServiceInfo[]>) => result && result.value)
    .catch(error => {
      setGeneralError(dispatch, error)
      return null
    }))

  if (services && services.length) {
    onServiceStarted(dispatch).catch((e) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e)
      }
    })
  }
}

const onServiceStarted = async (dispatch: Dispatch) => Promise.all([
  stopAccessPolicyFetchingStory(),
])

const onServiceStopped = async (dispatch: Dispatch) => Promise.all([
  startAccessPolicyFetchingStory(dispatch),
])

export const stopVpnServerStory = async (dispatch: Dispatch, services: ServiceInfo[]) => {
  if (!(services && services.length)) {
    return
  }

  await Promise.all(services.map(service => dispatch(stopServiceAction(service))))
    .catch((e) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e)
      }
    })

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

type SettingsPayload = IdentityPayout & {
  trafficOption: TrafficOptions
  shaperEnabled: boolean
  openVpnPort?: number
  configData: ConfigData
  provider: ProviderState
  providerPriceMinute: number
  providerPriceGiB: number
}

export const saveSettingsStory = async (dispatch: Dispatch, payload: SettingsPayload, to: any) => {
  console.log('*** saveSettingsStory:', payload)
  const {
    referralCode,
    ethAddress,
    email,
    trafficOption,
    provider,
    configData,
    shaperEnabled,
    openVpnPort,
    providerPriceGiB,
    providerPriceMinute,
  } = payload

  try {
    if ((provider.payout && provider.payout.ethAddress) || ethAddress) {
      await dispatch(updateIdentitiesAction({ id: provider.identity.id, ethAddress }))
    }
    if ((provider.payout && provider.payout.email) || email) {
      await dispatch(updateEmailAction({ id: provider.identity.id, email }))
    }
    if ((provider.payout && provider.payout.referralCode) || referralCode) {
      await dispatch(updateReferralAction({ id: provider.identity.id, referralCode }))
    }

    dispatch(setTrafficOptionAction(trafficOption))

    if (configData) {
      const accessPolicy = (trafficOption === TrafficOptions.SAFE && provider.accessPolicy)
        ? { list: provider.accessPolicy.id }
        : null
      const newData: ConfigData = {
        ...configData,
        payment: {
          'price-gb': providerPriceGiB ? Number(providerPriceGiB) : undefined,
          'price-minute': providerPriceMinute ? Number(providerPriceMinute) : undefined,
        },
        'access-policy': accessPolicy,
        openvpn: {
          port: openVpnPort ? Number(openVpnPort) : undefined,
        },
        shaper: {
          enabled: Boolean(shaperEnabled),
        },
      }

      dispatch(updateUserConfigAction(newData))
    }

    dispatch(push(to))
  } catch (e) {
    apiSubmissionError('walletAddress')(e)
  }
}

export const initSettingsStory = (dispatch) => {
  getCurrentAccessPolicy()
    .then(accessPolicy => dispatch(setAccessPolicyAction(accessPolicy)))
    .catch((e) => (process.env.NODE_ENV !== 'production') && console.error(e))
}
