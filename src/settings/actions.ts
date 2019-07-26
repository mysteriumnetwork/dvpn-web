import { createAction } from 'redux-actions'
import { PASSWORD_CHANGE } from './constants'
import { authChangePassword } from './api'

export const authPasswordChangeAction = createAction(PASSWORD_CHANGE, authChangePassword)
