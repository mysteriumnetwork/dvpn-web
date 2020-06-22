import React from "react";
import "../../assets/styles/pages/onboarding/main.scss"
import Welcome from "./Steps/Welcome";
import TermsAndConditions from "./Steps/TemsAndConditions";
import {Route, Switch} from "react-router-dom";
import { Grid } from "@material-ui/core";
import sideImage from '../../assets/images/onboarding/SideImage.png';

const Onboarding = () => {
  return (
    <div className="onboarding-wrapper">
      <div className="content-wrapper">
        <Switch>
          <Route exact={true}  path={`/onboarding`} component={Welcome}/>
          <Route exact={true}  path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
        </Switch>
      </div>
      <div className="side-wrapper">
        <img src={sideImage}/>
      </div>
    </div>
  )
};

export default Onboarding;