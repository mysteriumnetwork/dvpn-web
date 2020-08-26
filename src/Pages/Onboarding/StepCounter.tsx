import React, { ReactElement } from 'react';

interface PropsInterface {
    step: number;
}

const setUpCounter = (step: number): ReactElement[] => {
    const steps: ReactElement[] = [];
    for (let i = 0; i < 6; i++) {
        steps.push(<div key={i} className={'steps-counter--circle ' + (step - 1 >= i ? 'active' : '')}></div>);
    }
    return steps;
};

export const StepCounter: React.FC<PropsInterface> = (props): ReactElement => {
    return <div className="steps-counter">{setUpCounter(props.step)}</div>;
};
