import React from "react";
// @ts-ignore
import {TermsEndUser} from '@mysteriumnetwork/terms'
import {acceptWithTermsAndConditions, getCurrentIdentity} from "../../../api/TequilaApiCalls";
import "../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss"
import {withRouter} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import showdown from "showdown"
import {tequilApiResponseHandler} from '../../../Services/TequilApi/OnboardingResponseHandler'
import {BasicResponseInterface, CurrentIdentityResponseInterface} from "../../../api/TequilApiResponseInterfaces";
import {useHistory} from 'react-router'

const md = new showdown.Converter();

const TermsAndConditions = () => {
  const history = useHistory();
  const handleAgree = () => {
    acceptWithTermsAndConditions().then(response => {
      handleAcceptWitTermAndConditionsResponse(response)
    });
  };

  const handleAcceptWitTermAndConditionsResponse = (acceptWithTermAndConditionsResponse: BasicResponseInterface): void => {
    if (tequilApiResponseHandler(history, acceptWithTermAndConditionsResponse)) {
      getCurrentIdentity().then(response => {
          handleGetCurrentIdentityResponse(response);
        }
      )
    }
  };

  const handleGetCurrentIdentityResponse = (currentIdentityResponse: CurrentIdentityResponseInterface): void => {
    if (tequilApiResponseHandler(history, currentIdentityResponse)) {
      if (tequilApiResponseHandler(history, currentIdentityResponse)) {
        history.push("/onboarding/service-settings");
      }
    }
  }

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