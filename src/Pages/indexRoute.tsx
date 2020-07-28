import React from 'react';
import {
  getIdentityList,
  getUserConfig,
  getIdentity,
} from '../api/TequilaApiCalls'
import {
  BasicResponseInterface,
  UserConfigResponseInterface, IdentityListResponseInterface, IdentityResponseInterface
} from '../api/TequilApiResponseInterfaces'
import {Redirect, useHistory} from 'react-router';
import {RootState} from '../redux/store';
import {onboard} from "../redux/actions/onboarding/onboard";
import {connect} from 'react-redux';
import {getInitialRoute} from "../Services/GetInitialRoute";
import {CircularProgress} from "@material-ui/core";


const mapStateToProps = (state: RootState) => ({
  onboarded: state.onboarding.onboarded
});

const mapDispatchToProps = {onboard};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface StateInterface {
  route: string;
  loading: boolean;
}

const IndexRoute: React.FC<Props> = props => {
  const history = useHistory();
  const [values, setValues] = React.useState<StateInterface>({
    route: '',
    loading: true,
  });

  if (values.loading || !props.onboarded) {
    getInitialRoute().then(response => {
      handleInitialRouteResponse(response);
    });
  }

  const handleInitialRouteResponse = (initialRouteResponse: BasicResponseInterface): void => {
    if (initialRouteResponse.success) {
      handleInitialRouteSuccessResponse()
    } else {
      if (initialRouteResponse.isAuthoriseError) {
        props.onboard();
        setValues({...values, loading: false, route: "login"})
      }
      if (initialRouteResponse.isRequestFail) {
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
      if (userConfigResponse.isRequestFail) {
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
      if (identityListResponse.isRequestFail) {
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
      props.onboard();
      setValues({...values, loading: false, route: "login"})
    } else {
      if (identityResponse.isRequestFail) {
        history.push("/error");
      } else {
        setValues({...values, loading: false, route: "onboarding/service-settings"})
      }
    }
  };

  return (
    values.loading ?
      <div className="index-route-spinner"><CircularProgress /></div>
      :
      <Redirect to={"/" + values.route}/>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexRoute)
