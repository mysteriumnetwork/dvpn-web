import {authLogin} from '../api/User'
import {DEFAULT_USERNAME, DEFAULT_PASSWORD} from './constants'

export const getInitialRoute = () : Promise<boolean> => {
   return authLogin({username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD});
};