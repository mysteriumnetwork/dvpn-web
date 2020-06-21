import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";

const AppRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Redirect to= {"/" + "onboarding"} />
          )
        }}
      />
      <Route path="/login" component={Login}/>
      <Route path="/onboarding" component={Onboarding} />
    </Switch>
  );
}

export default AppRouter;
