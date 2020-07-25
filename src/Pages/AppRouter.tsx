import React from 'react';
import {Route, Redirect, Switch, RouteComponentProps} from "react-router-dom";
import '../assets/styles/App.scss';
import Login from "./Login/Login";
import Onboarding from "./Onboarding/Onboarding";
import RestartNode from "./Error/RestartNode";
import {getInitialRoute} from '../Services/GetInitialRoute'
import {
  getIdentityList,
  getUserConfig,
  getIdentity,
} from '../api/TequilaApiCalls'
import {
  BasicResponseInterface,
  UserConfigResponseInterface, IdentityListResponseInterface, IdentityResponseInterface
} from '../api/TequilApiResponseInterfaces'
import {useHistory} from 'react-router'

interface StateInterface {
  route: string;
  loading: boolean;
  onboardingPassed: boolean
}
const AppRouter = (props: any) => {
  const history = useHistory();
  const [values, setValues] = React.useState<StateInterface>({
    route: '',
    loading: true,
    onboardingPassed: false
  });

  if (values.loading && !values.onboardingPassed) {
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
      if(initialRouteResponse.isRequestFail){
        history.push("/error");
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
      if(userConfigResponse.isRequestFail){
        history.push("/error");
      } else {
        setValues({...values, loading: false, route: "onboarding"})
      }
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
      if(identityListResponse.isRequestFail){
        history.push("/error");
      } else {
        setValues({...values, loading: false, route: "onboarding"})
      }
    }
  };

  const handleGetIdentityResponse = (identityResponse: IdentityResponseInterface) => {
    if (
      identityResponse.success && (
        identityResponse.identity.registrationStatus.toString() !== "Unregistered" &&
        identityResponse.identity.registrationStatus.toString() !== "RegistrationError"
      )
    ) {
      setValues({...values, loading: false, route: "login", onboardingPassed: true})
    } else {
      if(identityResponse.isRequestFail){
        history.push("/error");
      } else {
        setValues({...values, loading: false, route: "onboarding/service-settings"})
      }
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
      <Route path="/onboarding">
        <Onboarding onboardingPassed={values.onboardingPassed}/>
      </Route>
      <Route path="/restart-node" component={RestartNode}/>
    </Switch>
  );
};

export default AppRouter;
