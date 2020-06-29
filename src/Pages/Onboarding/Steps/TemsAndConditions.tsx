import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import showdown from "showdown"
// @ts-ignore
import { TermsEndUser } from '@mysteriumnetwork/terms'
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"

const md = new showdown.Converter();

const TermsAndConditions = () => {
  const termsHtml = md.makeHtml(TermsEndUser);
  return (
    <div className="step-block term-and-conditions">
      <h1 className="step-block--heading">Terms & Conditions</h1>
      <div className="step-block-content">
        <div className="terms-and-conditions">
         <p> {TermsEndUser}</p>
        </div>
        <Link to="/onboarding/service-settings" className="btn btn-filled btn-center accept"><span className="btn-text">I accept</span></Link>
      </div>
      <StepCounter step={2}/>
    </div>
  );
};

export default TermsAndConditions;