import { createAction } from 'redux-actions'
import {
  ACCESS_POLICIES, ACCESS_POLICY,
  IDENTITIES,
  IDENTITY,
  ORIGINAL_LOCATION, RESIDENTIAL_CONFIRM, STARTED_SERVICE, TRAFFIC_OPTION
} from './constants'

export const setLocationAction = createAction(ORIGINAL_LOCATION)

export const setIdentitiesAction = createAction(IDENTITIES)

export const setIdentityAction = createAction(IDENTITY)

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const setStartedServiceAction = createAction(STARTED_SERVICE)

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

