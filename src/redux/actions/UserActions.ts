export type UserAction = {type: "LOGIN", payload: boolean};
export  const authenticateUser = (authenticated: boolean):UserAction =>({
  type: "LOGIN", payload: authenticated

});

