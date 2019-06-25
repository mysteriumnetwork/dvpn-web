import { createAction } from 'redux-actions'
import {
  ACCESS_POLICIES,
  ACCESS_POLICY,
  IDENTITIES,
  IDENTITY,
  IDENTITY_PAYOUT,
  NAT_STATUS,
  ORIGINAL_LOCATION,
  PASSWORD_CHANGE,
  RESIDENTIAL_CONFIRM,
  SERVICE_SESSIONS,
  SET_PROVIDER_STATE,
  STARTED_SERVICES,
  TRAFFIC_OPTION,
  UNLOCK_IDENTITY,
  UPDATE_IDENTITY,
  UPDATE_REFERRAL_CODE,
} from './constants'

import {
  authChangePassword,
  getCurrentIdentity,
  getIdentityPayout,
  getOriginalLocation,
  getServiceList,
  startService,
  stopService,
  unlocksIdentity,
  updateIdentity,
  updateReferralCode
} from './api'

export const setLocationAction = createAction(ORIGINAL_LOCATION, getOriginalLocation)

export const setIdentitiesAction = createAction(IDENTITIES)

export const updateIdentitiesAction = createAction(UPDATE_IDENTITY, updateIdentity, d => d)

export const updateReferralAction = createAction(UPDATE_REFERRAL_CODE, updateReferralCode, d => d)

export const unlocksIdentityAction = createAction(UNLOCK_IDENTITY, unlocksIdentity, d => d)

export const setIdentityAction = createAction(IDENTITY, getCurrentIdentity)

export const getIdentityPayoutAction = createAction(IDENTITY_PAYOUT, getIdentityPayout)

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const startServiceAction = createAction(STARTED_SERVICES, startService, d => ({ ...d, pending: true }))

export const stopServiceAction = createAction(STARTED_SERVICES, stopService, d => ({ ...d, pending: true }))

export const getServicesAction = createAction(STARTED_SERVICES, getServiceList)

export const setNatStatusAction = createAction(NAT_STATUS)

export const setServiceSessionAction = createAction(SERVICE_SESSIONS)

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

export const setProviderStateAction = createAction(SET_PROVIDER_STATE)

export const setPasswordChangeAction = createAction(PASSWORD_CHANGE, authChangePassword)

