import React from "react";
import "../../assets/styles/pages/onboarding/main.scss"
import Welcome from "./Steps/Welcome";
import TermsAndConditions from "./Steps/TemsAndConditions";
import Backup from "./Steps/Backup";
import ServiceSettings from "./Steps/ServiceSettings";
import NodeSettings from "./Steps/NodeSettings";
import PayoutSettings from "./Steps/Payout-settings";
import {Route, Switch} from "react-router-dom";
import sideImageOnboarding from '../../assets/images/onboarding/SideImage.png';

interface State {
  sideImage: string;
}

const Onboarding = (props: any) => {
    const [values, setValues] = React.useState<State>({
      sideImage: sideImageOnboarding
    });

  props.history.listen((location: any, action:  any) => {
    switch (window.location.pathname) {
      case '/onboarding':
        return  setValues({
          sideImage: sideImageOnboarding
        });
      default:
        return sideImageOnboarding;
    }
  });

  return (
    <div className="onboarding wrapper">
      <div className="steps">
        <Switch>
          <Route exact={true}  path={`/onboarding`} component={Welcome}/>
          <Route exact={true}  path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
          <Route exact={true}  path={`/onboarding/service-settings`} component={ServiceSettings}/>
          <Route exact={true}  path={`/onboarding/backup`} component={Backup}/>
          <Route exact={true}  path={`/onboarding/node-settings`} component={NodeSettings}/>
          <Route exact={true}  path={`/onboarding/payout-settings`} component={PayoutSettings}/>
        </Switch>
      </div>
      <div className="side">
        <img alt="onboarding" src={values.sideImage}/>
      </div>
    </div>
  )
};

export default Onboarding;