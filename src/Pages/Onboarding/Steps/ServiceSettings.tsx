import React from "react";
import {DefaultCheckbox} from '../../../Components/Checkbox/DefaultCheckbox'
import {DefaultSlider} from '../../../Components/DefaultSlider'
import "../../../assets/styles/pages/onboarding/steps/service-settings.scss"
import {setServicePrice} from "../../../api/User";
import {withRouter} from "react-router-dom";
import {DEFAULT_PRICE_PER_MINUTE_PRICE, DEFAULT_PRICE_PER_GB} from '../../../Services/constants'

const ServiceSettings = (props: any) => {
  const [checked, setChecked] = React.useState(false);
  const [pricePerMinute, setChangePricePerMinute] = React.useState<number>(DEFAULT_PRICE_PER_MINUTE_PRICE);
  const [PricePerGb, setChangePricePerGb] = React.useState<number>(DEFAULT_PRICE_PER_GB);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setChangePricePerMinute(DEFAULT_PRICE_PER_MINUTE_PRICE);
    setChangePricePerGb(DEFAULT_PRICE_PER_GB);
  };
  const handlePricePerMinuteChanged = (event: any, newValue: number) => {
    setChangePricePerMinute(newValue);
  };
  const handlePricePerGbChanged = (event: any, newValue: number) => {
    setChangePricePerGb(newValue);
  };

  const handleSettingSetup = () => {
    setServicePrice(pricePerMinute, PricePerGb).then(response => {
      if (response) {
        props.history.push("/onboarding/backup");
      }
    });
  };
  return (
    <div className="step-block service-settings">
      <h1 className="step-block--heading">Service price settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to start running a VPN service.</p>
      <div className="step-block-content">
        <div className="slider-block per-minute">
          <p>Price per minute</p>
          <DefaultSlider value={pricePerMinute} handleChange={() => handlePricePerMinuteChanged} step={0.001} min={0}
                         max={0.01} disabled={checked}/>
        </div>
        <div className="slider-block per-gb">
          <p>Price per GB</p>
          <DefaultSlider value={PricePerGb} handleChange={() => handlePricePerGbChanged} step={0.001} min={0}
                         max={0.01} disabled={checked}/>
        </div>
        <DefaultCheckbox checked={checked} handleCheckboxChange={() => handleCheckboxChange}
                         label="Use default pricing"/>
        <div onClick={handleSettingSetup} className="btn btn-filled btn-center next"><span
          className="btn-text">Next</span></div>
      </div>
    </div>
  );
};

export default withRouter(ServiceSettings);