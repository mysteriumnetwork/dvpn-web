import React, {ReactElement} from "react";

interface StepCounterProps {
  step: number,
}

const setUpCounter = (step: number) : ReactElement[]  => {
  let steps: ReactElement[] = [];
  for(let i : number = 0; i < 6; i++){
    steps.push(<div className={"steps-counter--circle " + (step -1 >= i ? 'active' : '')}></div>);
  }
  return steps;
};

export const StepCounter: React.FC<StepCounterProps> = (props): ReactElement => {
  return (
    <div className="steps-counter">
      {setUpCounter(props.step)}
    </div>
  )
};
