import React from "react";
import {DefaultSwitch} from '../../../../Components/DefaultSwitch'
import {DEFAULT_PRICE_PER_GB, DEFAULT_PRICE_PER_MINUTE_PRICE} from "../../../../Services/constants";

interface PropsInterface {
  name: string,
  type: string,
  pricePerMinute: string,
  pricePerGb: string,
  whiteListed: boolean,
  turnedOn: boolean
}

const ServicesBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  const [values, setValues] = React.useState({
    whitelisted: props.whiteListed,
    turnedOn: props.turnedOn,
  });
  const handleTurnedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, turnedOn: event.target.checked})
  }
  const handleWhitelistedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, whitelisted: event.target.checked})
  }

  return (
    <div className="services-blocks-row--block">
      <div className="header-row">
        <div className="logo-block">
          <div className={props.turnedOn ? "status-dot on" : "status-dot off"}></div>
        </div>
        <div className="name-block">
          <p className="name">{props.name}</p>
          <p className="type">{props.type}</p>
        </div>
      </div>
      <div className="stats-row">
        <div className="service-stat text">
          <div className="title">Price per minute</div>
          <div className="text">{props.pricePerMinute}</div>
        </div>
        <div className="service-stat text">
          <div className="title">Price per GB</div>
          <div className="text">{props.pricePerGb}</div>
        </div>
        <div className="service-stat switch">
          <div className="title">Whitelisted</div>
          <DefaultSwitch tunedOn={values.whitelisted} handleChange={() => handleWhitelistedChange} type="normal"/>
        </div>
        <div className="service-stat switch">
          <div className="title">Turned on</div>
          <DefaultSwitch tunedOn={values.turnedOn} handleChange={() => handleTurnedOnChange} type="normal"/>
        </div>
      </div>
      <div className="control-row">
        <div className="button">Session history</div>
        <div className="button">Settings</div>
      </div>
    </div>
  );
};

export default ServicesBlock;
