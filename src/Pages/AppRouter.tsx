import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import '../assets/styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import {getInitialRoute} from '../Services/GetInitialRoute'

const AppRouter = () => {
  let route = getInitialRoute();
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Redirect to= {"/" + route} />
          )
        }}
      />
      <Route path="/login" component={Login}/>
      <Route path="/onboarding" component={Onboarding} />
    </Switch>
  );
};

export default AppRouter;
