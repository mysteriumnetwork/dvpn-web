import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"

const TermsAndConditions = () => {
  return (
    <div className="block terms-and-conditions">
      <h1 className="heading">Terms & Conditions</h1>
      <div className="content terms-and-conditions">
        <div className="terms-and-conditions-wrapper">
          asdasdasdasdasd
        </div>
        <Link to="/onboarding/terms-and-conditions" className="btn btn-filled accept"><span className="btn-text">I accept</span></Link>
      </div>
      <StepCounter step={2}/>
    </div>
  );
};

export default TermsAndConditions;