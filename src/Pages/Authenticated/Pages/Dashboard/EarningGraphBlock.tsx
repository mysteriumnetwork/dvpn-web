import React from "react";

interface PropsInterface {
  month: string
}

const EarningGraphBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  return (
    <div className="dashboard--earnings-graph">
    </div>
  );
};

export default EarningGraphBlock;
