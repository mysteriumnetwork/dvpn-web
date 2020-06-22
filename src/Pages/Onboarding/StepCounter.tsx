import React from "react";

interface StepCounterProps {
  step: number,
}
const setUpCounter = (step: number)  => {
  let elements = [];
  for(let i : number = 0; i < 6; i++){
    elements.push(<div className={"circle " + (step -1 >= i ? 'active' : '')}></div>);
  }
  return elements;
};

export const StepCounter: React.FC<StepCounterProps> = (props) => {
  return (
    <div className="step-counter-wrapper">
      {setUpCounter(props.step)}
    </div>
  )
};
