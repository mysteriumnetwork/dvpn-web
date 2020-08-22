import React from "react";
import "../../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss"

interface PropsInterface {
  country: string,
  status: boolean,
  id: string,
  time: string,
  data: string,
  value: string
}

const SessionBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="session-block">
      <div className="heading-row">
        <div className="title">{props.country}</div>
        <div className={props.status ? "status success" : "status failed"}>
          {
            props.status ?
              "Ongoing"
              :
              ""
          }
        </div>
      </div>
      <div className="id">{props.id}</div>
      <div className="stats-row">
        <div className="stat">{props.time}</div>
        <div className="stat">{props.data}</div>
        <div className="stat">{props.value}</div>
      </div>
    </div>
  );
};

export default SessionBlock;
