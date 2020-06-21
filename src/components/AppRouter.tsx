import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import '../styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import {initialRoute} from '../api/initialRoute'

const AppRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Redirect to= {"/" + initialRoute()} />
          )
        }}
      />
      <Route path="/login" component={Login}/>
      <Route path="/onboarding" component={Onboarding} />
    </Switch>
  );
};

export default AppRouter;
