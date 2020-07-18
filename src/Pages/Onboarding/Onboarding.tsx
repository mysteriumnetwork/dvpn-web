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
import {StepCounter} from "./StepCounter";

interface State {
  sideImage: string;
  step: number
}

interface stepInterface {
  step: number,
  image: string
}

const setSideImage = (): stepInterface => {
  switch (window.location.pathname) {
    case '/onboarding':
      return {step: 1, image: sideImageOnboarding};
    case '/onboarding/terms-and-conditions':
      return {step: 2, image: sideImageOnboarding};
    case '/onboarding/service-settings':
      return {step: 3, image: sideImageOnboarding};
    case '/onboarding/backup':
      return {step: 4, image: sideImageOnboarding};
    case '/onboarding/node-settings':
      return {step: 5, image: sideImageOnboarding};
    case '/onboarding/payout-settings':
      return {step: 6, image: sideImageOnboarding};
    case '/onboarding/terms-and-conditions':
      return {step: 7 , image: sideImageOnboarding};
    default:
      return {step: 1, image: sideImageOnboarding};
  }
};

const Onboarding = (props: any) => {
  let stepInfo = setSideImage();
  const [values, setValues] = React.useState<State>({
    sideImage: stepInfo.image,
    step: stepInfo.step
  });

  props.history.listen((location: any, action: any) => {
    setValues({
      ...values,
      sideImage: stepInfo.image,
      step: stepInfo.step
    });
  });

  return (
    <div className="onboarding wrapper">
      <div className="steps">
        <div className="steps-content">
          <Switch>
            <Route exact={true} path={`/onboarding`} component={Welcome}/>
            <Route exact={true} path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
            <Route exact={true} path={`/onboarding/service-settings`} component={ServiceSettings}/>
            <Route exact={true} path={`/onboarding/backup`} component={Backup}/>
            <Route exact={true} path={`/onboarding/node-settings`} component={NodeSettings}/>
            <Route exact={true} path={`/onboarding/payout-settings`} component={PayoutSettings}/>
          </Switch>
          <StepCounter step={values.step}/>
        </div>
      </div>
      <div className="side">
        <img alt="onboarding" src={values.sideImage}/>
      </div>
    </div>
  )
};

export default Onboarding;