import { createAction } from 'redux-actions'
import { HEALTH_CHECK, LOGIN, REPORT_ISSUE } from './constants'

import { healthCheck, sendReportIssue } from './api'
import { authLogin } from '../settings/api'

export const healthCheckAction = createAction(HEALTH_CHECK, healthCheck)

export const authAuthLoginAction = createAction(LOGIN, authLogin)

export const sendReportIssueAction = createAction(REPORT_ISSUE, sendReportIssue)
