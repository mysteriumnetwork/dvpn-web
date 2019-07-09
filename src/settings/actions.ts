import { createAction } from 'redux-actions'
import { LOGIN, PASSWORD_CHANGE } from './constants'
import { authChangePassword, authLogin } from './api'

export const authPasswordChangeAction = createAction(PASSWORD_CHANGE, authChangePassword)

export const authAuthLoginAction = createAction(LOGIN, authLogin)
