import {authLogin} from '../api/User'

export const getInitialRoute = () : Promise<boolean> => {
   return authLogin({username: "myst", password: "mystberry"});
};