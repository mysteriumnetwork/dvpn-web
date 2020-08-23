import React from "react";
import {ReactComponent as Icon} from '../../../../assets/images/authenticated/pages/dashboard/graph-icon.svg'

interface PropsInterface {
  month: string
}

const EarningGraphBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
  const props: PropsInterface = {..._props};
  const [values, setValues] = React.useState({
    active: 'earnings',
  });
  return (
    <div className="dashboard--earnings-graph">
      <div className="control-row">
        <div
          className={values.active == 'earnings' ? 'control-btn active' : 'control-btn' }
          onClick={() => setValues({...values, active: 'earnings'})}
        >
          Earnings
        </div>
        <div
          className={values.active == 'sessions' ? 'control-btn active' : 'control-btn' }
          onClick={() => setValues({...values, active: 'sessions'})}
        >
          Sessions
        </div>
        <div
          className={values.active == 'data' ? 'control-btn active' : 'control-btn' }
          onClick={() => setValues({...values, active: 'data'})}
        >
          Data
        </div>
        <div className="more-btn">
          <Icon/>
        </div>
      </div>
    </div>
  );
};

export default EarningGraphBlock;
