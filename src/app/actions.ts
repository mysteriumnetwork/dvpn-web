import { createAction } from 'redux-actions'
import { CONFIG_DATA, HEALTH_CHECK, LOGIN, REPORT_ISSUE } from './constants'

import { getUserConfig, healthCheck, sendReportIssue, updateUserConfig } from './api'
import { authLogin } from '../settings/api'

export const healthCheckAction = createAction(HEALTH_CHECK, healthCheck)

export const authAuthLoginAction = createAction(LOGIN, authLogin)

export const sendReportIssueAction = createAction(REPORT_ISSUE, sendReportIssue)

export const getUserConfigAction = createAction(CONFIG_DATA, getUserConfig)

export const updateUserConfigAction = createAction(CONFIG_DATA, updateUserConfig)
