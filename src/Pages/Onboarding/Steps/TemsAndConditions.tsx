import React from "react";
import {StepCounter} from "../StepCounter";
import {acceptWithTermsAndConditions} from "../../../api/User";
// @ts-ignore
import {TermsEndUser} from '@mysteriumnetwork/terms'
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"
import {withRouter} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import showdown from "showdown"

const md = new showdown.Converter();

const TermsAndConditions = (props: any) => {
  const handleAgree = () => {
    acceptWithTermsAndConditions().then(response => {
      if (response) {
        props.history.push("/onboarding/service-settings");
      }
    });
  };
  const termsHtml = md.makeHtml(TermsEndUser);
  return (
    <div className="step-block term-and-conditions">
      <h1 className="step-block--heading">Terms & Conditions</h1>
      <div className="step-block-content">
        <div className="terms-and-conditions">
          <p>{ReactHtmlParser(termsHtml)}</p>
        </div>
        <div onClick={handleAgree} className="btn btn-filled btn-center accept"><span
          className="btn-text">I accept</span></div>
      </div>
      <StepCounter step={2}/>
    </div>
  );
};

export default withRouter(TermsAndConditions);