import React from "react";
import Welcome from './Steps/Welcome'
import TermsAndConditions from './Steps/TermsAndConditions'
import {Route} from "react-router-dom";

class Onboarding extends React.Component{
  render() {
    return (
      <div>
        <Route exact={true}  path={`/onboarding`} component={Welcome}/>
        <Route path={`/onboarding/terms-and-conditions`} component={TermsAndConditions}/>
      </div>
    );
  }
}

export default Onboarding;