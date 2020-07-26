export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return {type, payload};
}

type UserState = {
  isAuthenticated: boolean;
};
const initialState: UserState = {isAuthenticated: false};
export const login = (isAuthenticated: boolean) => {
  return typedAction('user/LOGIN', isAuthenticated);
};
export const logout = () => {
  return typedAction('user/LOGOUT', false);
};
type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case 'user/LOGIN':
      return {...initialState, isAuthenticated: true};
    case 'user/LOGOUT':
      return {...initialState, isAuthenticated: false};
    default:
      return state;
  }
}