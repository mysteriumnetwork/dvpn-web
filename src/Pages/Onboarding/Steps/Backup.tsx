import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";

const Backup = () => {
  return (
    <div className="step-block">
      <h1 className="step-block--heading">Backup your keys</h1>
      <div className="step-block--content">
      </div>
      <StepCounter step={3}/>
    </div>

  );
};

export default Backup;