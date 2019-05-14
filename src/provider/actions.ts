import { createAction } from 'redux-actions'

export const ORIGINAL_LOCATION = 'ORIGINAL_LOCATION'

export const ACCESS_POLICIES = 'ACCESS_POLICIES'

export const ACCESS_POLICY = 'ACCESS_POLICY'

export const STARTED_SERVICE = 'STARTED_SERVICE'

export const TRAFFIC_OPTION = 'TRAFFIC_OPTION'

export const RESIDENTIAL_CONFIRM = 'RESIDENTIAL_CONFIRM'

export const setLocationAction = createAction(ORIGINAL_LOCATION)

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const setStartedServiceAction = createAction(STARTED_SERVICE)

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

