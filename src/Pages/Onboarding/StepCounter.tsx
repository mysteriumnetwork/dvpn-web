/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
