import React from "react";

interface PropsInterface {
  month: string
  mystValue: string,
  earnings: string,
  residentialPosition: string,
  residentialPositionOf: string,
  countryPosition: string,
  countryPositionOf: string,
}

const EarningStatisticBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="dashboard--earnings-info">
      <p className="heading">Bounty pilot ({props.month})</p>
      <div className="info-row">
        <p className="statement">{props.mystValue}</p>
        <p className="statement-info">{props.earnings}</p>
      </div>
      <div className="info-row">
        <p className="statement">Residential position: {props.residentialPosition} <span>Eligible</span></p>
        <p className="statement-info">out of {props.residentialPositionOf}</p>
      </div>
      <div className="info-row">
        <p className="statement">Country position: {props.countryPosition} <span>Eligible</span></p>
        <p className="statement-info">out of {props.countryPositionOf}</p>
      </div>
      <div className="more-button">
        <div className="more-button--dot"></div>
        <div className="more-button--dot"></div>
        <div className="more-button--dot"></div>
      </div>
    </div>
  );
};

export default EarningStatisticBlock;
