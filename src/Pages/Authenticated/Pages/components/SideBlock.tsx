import React from "react";
import "../../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss"
import SessionBlock from "./SessionBlock"

interface PropsInterface {

}

const SideBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="side-block">
      <p className="heading">Last sessions</p>
      <div className="side-block--content">
        <div className="sessions-wrapper">
          <SessionBlock
            country="Lithuania"
            status={true}
            id="30c9f73d-174a-4002-b84d-5ddad5c5b908"
            time="2:34:15"
            data="2.46GB"
            value="1.038 MYST"
          />
          <SessionBlock
            country="United Kingdom"
            status={false}
            id="30c9f73d-174a-4002-b84d-5ddad5c5b908"
            time="2:34:15"
            data="2.46GB"
            value="5.216 MYST"
          />
          <SessionBlock
            country="United Kingdom"
            status={false}
            id="30c9f73d-174a-4002-b84d-5ddad5c5b908"
            time="2:34:15"
            data="2.46GB"
            value="8.195 MYST"
          />
          <SessionBlock
            country="Canada"
            status={false}
            id="30c9f73d-174a-4002-b84d-5ddad5c5b908"
            time="2:34:15"
            data="2.46GB"
            value="5.216 MYST"
          />
          <div className="button-block">
            <div onClick={() => alert("click")} className="btn btn-empty btn-center all"><span
              className="btn-text">View all sessions</span></div>
          </div>
        </div>
        <div className="sum-wrapper">
          <div className="sum-block">
            <div className="name">17.62 MYST</div>
            <div className="explanation">Live earnings</div>
          </div>
          <div className="sum-block">
            <div className="name">37.3 Gb</div>
            <div className="explanation">37.3 Gb</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBlock;
