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
      <Route exact path="/login" component={Login} />
      <Route path="/onboarding" component={Onboarding} />
      <Route exact path="/error" component={RestartNode}/>
    </Switch>
  );
};
export default AppRouter;
