import {authLogin, getidentityList} from '../api/Login'
export const initialRoute = () : string => {
  authLogin({username: "myst", password: "mystberry"});

  return ""
};
