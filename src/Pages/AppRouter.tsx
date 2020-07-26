import React from 'react';
import {Route, Switch} from "react-router-dom";
import '../assets/styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import RestartNode from "./Error/RestartNode";
import IndexRoute from "./indexRoute";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={IndexRoute}/>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/onboarding">
        <Onboarding/>
      </Route>
      <Route path="/restart-node" component={RestartNode}/>
    </Switch>
  );
};
export default AppRouter;
