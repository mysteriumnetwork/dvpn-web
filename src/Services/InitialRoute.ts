import {authLogin} from '../api/Login'

export const initialRoute = () : string => {
  let initialRoute = "login";

  try {
    authLogin({username: "myst", password: "mystberry"});
    initialRoute = "onboarding";
  } catch (e) {
    console.log(e)
  }

  return initialRoute;
};