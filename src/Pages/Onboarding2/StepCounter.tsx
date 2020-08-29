/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, ReactElement } from 'react';

import '../../assets/styles/pages/onboarding/steps/welcome.scss';

interface PropsInterface {
    currentStep: number;
    totalStepCount: number;
}

const generateSteps = (currentStep: number, totalStepCount: number): ReactElement[] => {
    const steps: ReactElement[] = [];
    for (let i = 0; i < totalStepCount; i++) {
        steps.push(<div key={i} className={'steps-counter--circle ' + (currentStep >= i ? 'active' : '')}></div>);
    }
    return steps;
};

const StepCounter: FC<PropsInterface> = ({ currentStep, totalStepCount }) => {
    return (
        <div className="steps-counter">
            {generateSteps(currentStep, totalStepCount)}
        </div>
    );
};

export default StepCounter;
