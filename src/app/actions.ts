import { createAction } from 'redux-actions'
import { HEALTH_CHECK, LOGIN } from './constants'

import { healthCheck } from './api'
import { authLogin } from '../settings/api'

export const healthCheckAction = createAction(HEALTH_CHECK, healthCheck)

export const authAuthLoginAction = createAction(LOGIN, authLogin)
