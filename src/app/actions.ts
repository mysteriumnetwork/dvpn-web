import { createAction } from 'redux-actions'
import { HEALTH_CHECK } from './constants'

import { healthCheck } from './api'

export const healthCheckAction = createAction(HEALTH_CHECK, healthCheck)

