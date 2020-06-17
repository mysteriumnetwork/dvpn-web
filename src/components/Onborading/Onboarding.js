import React from "react";
import Welcome from './Steps/Welcome'
import TermsAndConditions from './Steps/TermsAndConditions'
import {Route, Switch} from "react-router-dom";

class Onboarding extends React.Component{
  render() {
    return (
      <div>
        <Switch>
          <Route exact={true}  path={`/onboarding`} component={Welcome}/>
          <Route exact={true}  path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
        </Switch>
      </div>
    );
  }
}

export default Onboarding;