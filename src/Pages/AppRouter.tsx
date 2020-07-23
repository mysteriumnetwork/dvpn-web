import React from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import '../assets/styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import RestartNode from "./Error/RestartNode";
import {getInitialRoute} from '../Services/GetInitialRoute'
import {
  getIdentityList,
  getUserConfig,
  getIdentity,
  BasicResponseInterface,
  UserConfigResponseInterface, IdentityListResponseInterface, IdentityResponseInterface
} from '../api/User'

interface AppRouterStateInterface {
  route: string;
  loading: boolean;
  onboardingPassed: boolean
}

const AppRouter = () => {
  const [values, setValues] = React.useState<AppRouterStateInterface>({
    route: '',
    loading: true,
    onboardingPassed: false
  });

  if (values.loading) {
    getInitialRoute().then(response => {
      handleInitialRouteResponse(response);
    });
  }
  const handleInitialRouteResponse = (initialRouteResponse: BasicResponseInterface): void => {
    if (initialRouteResponse.success) {
      handleInitialRouteSuccessResponse()
    } else {
      if (initialRouteResponse.isAuthoriseError) {
        setValues({...values, loading: false, route: "login", onboardingPassed: true})
      }
    }
  };

  const handleInitialRouteSuccessResponse = (): void => {
    getUserConfig().then(response => {
        handleUserConfigResponse(response)
      }
    )
  };

  const handleUserConfigResponse = (userConfigResponse: UserConfigResponseInterface) => {
    if (userConfigResponse.userConfig.data.mysteriumwebui) {
      handleUSerConfigSuccessResponse();
    } else {
      setValues({...values, loading: false, route: "onboarding/service-settings"})
    }
  };

  const handleUSerConfigSuccessResponse = (): void => {
    getIdentityList().then(response => {
      handleIdentityListResponse(response);
    })
  };

  const handleIdentityListResponse = (identityListResponse: IdentityListResponseInterface): void => {
    if (identityListResponse.identityRef[0].id) {
      getIdentity(identityListResponse.identityRef[0].id).then(response => {
        handleGetIdentityResponse(response);
      })
    } else {
      setValues({...values, loading: false, route: "onboarding"})
    }
  };

  const handleGetIdentityResponse = (identityResponse: IdentityResponseInterface) => {
    if (
      identityResponse.success && (
        identityResponse.identity.registrationStatus.toString() !== "Unregistered" ||
        identityResponse.identity.registrationStatus.toString() !== "RegistrationError"
      )
    ) {
      setValues({...values, loading: false, route: "login", onboardingPassed: true})

    } else {
      setValues({...values, loading: false, route: "onboarding/service-settings"})
    }
  };

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
      <Route path="/restart-node" component={RestartNode}/>
    </Switch>
  );
};

export default AppRouter;
