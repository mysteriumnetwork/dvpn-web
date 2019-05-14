import { createAction } from 'redux-actions'
import { tequilaApi } from '../api'

export const ORIGINAL_LOCATION = 'ORIGINAL_LOCATION'

export const ACCESS_POLICIES = 'ACCESS_POLICIES'

export const STARTED_SERVICE = 'STARTED_SERVICE'

export const getLocationAction = createAction(ORIGINAL_LOCATION, () => tequilaApi.location())
