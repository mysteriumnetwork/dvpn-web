import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/service-settings.scss"
import {Slider} from '@material-ui/core';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox'

const ServiceSettings = () => {
  const [checked, setChecked] = React.useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="step-block service-settings">
      <h1 className="step-block--heading">Service price settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to start running a VPN service.</p>
      <div className="step-block-content">
        <div className="slider-block per-minute">
          <p>Price per minute</p>
          <Slider
            defaultValue={0.005}
            valueLabelDisplay="auto"
            step={0.001}
            min={0}
            max={1.000}
          />
        </div>
        <div className="slider-block per-gb">
          <p>Price per GB</p>
          <Slider
            defaultValue={0.005}
            valueLabelDisplay="auto"
            step={0.001}
            min={0}
            max={1.000}
          />
        </div>
        <div className="checkbox-block">
          <DefaultCheckbox checked={checked} handleCheckboxChange={() => handleCheckboxChange} />
          <p>Use default pricing</p>
        </div>
        <Link to="/onboarding/backup" className="btn btn-filled next"><span className="btn-text">Skip</span></Link>
      </div>
      <StepCounter step={3}/>
    </div>

  );
};

export default ServiceSettings;