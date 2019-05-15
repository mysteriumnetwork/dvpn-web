import { createAction } from 'redux-actions'
import {
  ACCESS_POLICIES,
  ACCESS_POLICY,
  IDENTITIES,
  IDENTITY, IDENTITY_PAYOUT,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  STARTED_SERVICE,
  TRAFFIC_OPTION,
  UNLOKS_IDENTITY,
  UPDATE_IDENTITY
} from './constants'
import {
  getCurrentService,
  getFirstIdentity,
  getIdentityPayout,
  getOriginalLocation,
  startService,
  StartServiceInterface,
  stopService,
  unlocksIdentity,
  updateIdentity
} from './api'
import { Service } from '../api/data/service'

export const setLocationAction = createAction(ORIGINAL_LOCATION, async () => await getOriginalLocation())

export const setIdentitiesAction = createAction(IDENTITIES)

export const updateIdentitiesAction = createAction(UPDATE_IDENTITY, async (d) => await updateIdentity(d), d => d)

export const unlocksIdentityAction = createAction(UNLOKS_IDENTITY, async (d) => await unlocksIdentity(d), d => d)

export const setIdentityAction = createAction(IDENTITY, async () => await getFirstIdentity())

export const setIdentityPayoutAction = createAction(IDENTITY_PAYOUT, async (identity) => await getIdentityPayout(identity))

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const startServiceAction = createAction(STARTED_SERVICE,
  async (data: StartServiceInterface) => await startService(data),
  value => value)

export const stopServiceAction = createAction(STARTED_SERVICE, async (service: Service) => await stopService(service))

export const getServiceAction = createAction(STARTED_SERVICE, async () => await getCurrentService())

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

