import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import '../assets/styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import {getInitialRoute} from '../Services/GetInitialRoute'

interface AppRouterStateInterface {
  route: string;
  loading: boolean;
}

const AppRouter = () => {
  const [values, setValues] = React.useState<AppRouterStateInterface>({
    route: '',
    loading: true,
  });

  if (values.loading) {
    getInitialRoute().then(response => {
      if (response.success) {
        setValues({...values, loading: false, route: "onboarding"})
      } else {
        if (response.isAuthoriseError) {
          setValues({...values, loading: false, route: "login"})
        }
      }
    });
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return (
            values.loading ?
              <Redirect to={"/"}/>
              :
              <Redirect to={"/" + values.route}/>
          )
        }}
      />
      <Route path="/login" component={Login}/>
      <Route path="/onboarding" component={Onboarding}/>
    </Switch>
  );
};

export default AppRouter;
