import React from "react";
// @ts-ignore
import {TermsEndUser} from '@mysteriumnetwork/terms'
import {acceptWithTermsAndConditions, getCurrentIdentity} from "../../../api/User";
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"
import {withRouter} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import showdown from "showdown"

const md = new showdown.Converter();

const TermsAndConditions = (props: any) => {
  const handleAgree = () => {
    acceptWithTermsAndConditions().then(response => {
      if (response.success) {
        getCurrentIdentity().then(response => {
            if(response.success){
              props.history.push("/onboarding/service-settings");
            }
          }
        )
      }
    });
  };
  const termsHtml = md.makeHtml(TermsEndUser);
  return (
    <div className="step-block term-and-conditions">
      <h1 className="step-block--heading">Terms & Conditions</h1>
      <div className="step-block-content">
        <div className="terms-and-conditions">
          {ReactHtmlParser(termsHtml)}
        </div>
        <div onClick={handleAgree} className="btn btn-filled btn-center accept"><span
          className="btn-text">I accept</span></div>
      </div>
    </div>
  );
};

export default withRouter(TermsAndConditions);