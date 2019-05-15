import { createAction } from 'redux-actions'
import {
  ACCESS_POLICIES,
  ACCESS_POLICY,
  IDENTITIES,
  IDENTITY,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  STARTED_SERVICE,
  TRAFFIC_OPTION,
  UNLOKS_IDENTITY,
  UPDATE_IDENTITY
} from './constants'
import { getFirstIdentity, getOriginalLocation, unlocksIdentity, updateIdentity } from './api'

export const setLocationAction = createAction(ORIGINAL_LOCATION, async () => await getOriginalLocation())

export const setIdentitiesAction = createAction(IDENTITIES)

export const updateIdentitiesAction = createAction(UPDATE_IDENTITY, async (d) => await updateIdentity(d), d => d)

export const unlocksIdentityAction = createAction(UNLOKS_IDENTITY, async (d) => await unlocksIdentity(d), d => d)

export const setIdentityAction = createAction(IDENTITY, async () => await getFirstIdentity())

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const setStartedServiceAction = createAction(STARTED_SERVICE)

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

