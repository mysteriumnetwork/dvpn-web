import {authLogin, AuthResponseInterface} from '../api/User'
import {DEFAULT_USERNAME, DEFAULT_PASSWORD} from './constants'

export const getInitialRoute = (): Promise<AuthResponseInterface> => {
  return authLogin({username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD});
};