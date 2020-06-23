import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/service-settings.scss"

const ServiceSettings = () => {
  return (
    <div className="step-block service-settings">
      <h1 className="step-block--heading">Service price settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to start running a VPN service.</p>
      <div className="step-block-content">
        <Link to="/onboarding/backup" className="btn btn-filled next"><span className="btn-text">Skip</span></Link>
      </div>
      <StepCounter step={3}/>
    </div>

  );
};

export default ServiceSettings;