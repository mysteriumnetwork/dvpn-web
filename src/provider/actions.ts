import { createAction } from 'redux-actions'

export const ORIGINAL_LOCATION = 'provider/ORIGINAL_LOCATION'

export const IDENTITIES = 'provider/IDENTITIES'

export const IDENTITY = 'provider/IDENTITY'

export const ACCESS_POLICIES = 'provider/ACCESS_POLICIES'

export const ACCESS_POLICY = 'provider/ACCESS_POLICY'

export const STARTED_SERVICE = 'provider/STARTED_SERVICE'

export const TRAFFIC_OPTION = 'provider/TRAFFIC_OPTION'

export const RESIDENTIAL_CONFIRM = 'provider/RESIDENTIAL_CONFIRM'

export const setLocationAction = createAction(ORIGINAL_LOCATION)

export const setIdentitiesAction = createAction(IDENTITIES)

export const setIdentityAction = createAction(IDENTITY)

export const setAccessPoliciesAction = createAction(ACCESS_POLICIES)

export const setAccessPolicyAction = createAction(ACCESS_POLICY)

export const setStartedServiceAction = createAction(STARTED_SERVICE)

export const setTrafficOptionAction = createAction(TRAFFIC_OPTION)

export const setResidentialConfirmAction = createAction(RESIDENTIAL_CONFIRM)

