import {UserAction} from "../actions/UserActions";

export interface UserState {
  isAuthenticated: boolean;
}
const initialUserState = {
  isAuthenticated: false
};
export const userReducer = (state:UserState = initialUserState, action: UserAction)  => {
  switch (action.type) {
    case "LOGIN":
      return {... state, isAuthenticated : action.payload}
    default:
      return state
  }
}