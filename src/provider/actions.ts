import { createAction } from 'redux-actions'
import {
  ACCESS_POLICIES,
  ACCESS_POLICY,
  IDENTITIES,
  IDENTITY,
  ORIGINAL_LOCATION,
  RESIDENTIAL_CONFIRM,
  STARTED_SERVICE,
  TRAFFIC_OPTION
} from './constants'
import { startService, StartServiceInterface, stopService } from './api'
import { Service } from '../api/data/service'

export const setLocationAction = createAction(ORIGINAL_LOCATION)

export const setIdentitiesAction = createAction(IDENTITIES)

export const setIdentityAction = createAction(IDENTITY)

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const startServiceAction = createAction(STARTED_SERVICE,
  async (data: StartServiceInterface) => await startService(data),
  value => value)

export const stopServiceAction = createAction(STARTED_SERVICE, async (service: Service) => await stopService(service))

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

