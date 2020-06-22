import React from "react";
import {StepCounter} from "../StepCounter";

const Backup = () => {
  return (
    <div className="block backup">
      <h1 className="heading">Backup your keys</h1>
      <div className="content backup">
      </div>
      <StepCounter step={3}/>
    </div>
  );
};

export default Backup;