import React from "react";

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
    Whitelisted: props.whiteListed,
    turnedOn: props.turnedOn,
  });
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
        </div>
        <div className="service-stat switch">
          <div className="title">Turned on</div>
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
