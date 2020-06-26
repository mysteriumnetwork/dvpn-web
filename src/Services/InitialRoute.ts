import {authLogin, getidentityList} from '../api/Login'
export const initialRoute = () : string => {

  console.log(authLogin({username: "asd", password: "mystberry"}));
  console.log(getidentityList());
  return "onboarding"
};
