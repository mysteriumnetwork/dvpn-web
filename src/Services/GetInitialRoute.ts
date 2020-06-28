import {authLogin} from '../api/User'

export const getInitialRoute = () : string => {
  let initialRoute = "login";

  try {
    authLogin({username: "myst", password: "mystberry"});
    initialRoute = "onboarding";
  } catch (e) {
    console.log(e)
  }

  return initialRoute;
};