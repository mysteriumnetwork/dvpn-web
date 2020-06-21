import React from "react";
import '../../styles/onboarding/main.scss'
import Welcome from "./steps/Welcome";
import TermsAndConditions from './steps/TemsAndConditions'
import {Route, Switch} from "react-router-dom";
import { Grid } from "@material-ui/core";

const Onboarding = () => {
  return (
    <div className="onboarding-wrapper">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="content-box"
      >
        <Switch>
          <Route exact={true}  path={`/onboarding`} component={Welcome}/>
          <Route exact={true}  path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
        </Switch>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className="side-box"
      >
      </Grid>
    </div>
  )
};

export default Onboarding;