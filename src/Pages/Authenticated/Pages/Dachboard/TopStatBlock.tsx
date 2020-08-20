import React from "react";

interface PropsInterface {
  stat: string
  name: string
}

const DashboardTopStatsBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="dashboard--top-stat">
      <p className="stat">{props.stat}</p>
      <p className="name">{props.name}</p>
    </div>
  );
};

export default DashboardTopStatsBlock;
