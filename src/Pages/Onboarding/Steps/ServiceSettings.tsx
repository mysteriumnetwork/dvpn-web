import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import "../../../assets/styles/pages/onboarding/steps/service-settings.scss"
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox'
import { DefaultSlider } from '../../../Components/DefaultSlider'

const ServiceSettings = () => {
  const [checked, setChecked] = React.useState(false);
  const [pricePerMinute, setChangePricePerMinute] = React.useState<number>(0.005);
  const [PricePerGb, setChangePricePerGb] = React.useState<number>(0.005);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handlePricePerMinuteChanged = (event: any, newValue: number) => {
    setChangePricePerMinute(newValue);
  };
  const handlePricePerGbChanged = (event: any, newValue: number) => {
    setChangePricePerGb(newValue);
  };

  return (
    <div className="step-block service-settings">
      <h1 className="step-block--heading">Service price settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to start running a VPN service.</p>
      <div className="step-block-content">
        <div className="slider-block per-minute">
          <p>Price per minute</p>
          <DefaultSlider value={pricePerMinute} handleChange={() => handlePricePerMinuteChanged} step={0.001} min={0} max={0.01}/>
        </div>
        <div className="slider-block per-gb">
          <p>Price per GB</p>
          <DefaultSlider value={PricePerGb} handleChange={() => handlePricePerGbChanged} step={0.001} min={0} max={0.01}/>
        </div>
        <DefaultCheckbox checked={checked} handleCheckboxChange={() => handleCheckboxChange} label="Use default pricing" />
        <Link to="/onboarding/backup" className="btn btn-filled btn-center next"><span className="btn-text">Skip</span></Link>
      </div>
      <StepCounter step={3}/>
    </div>
  );
};

export default ServiceSettings;