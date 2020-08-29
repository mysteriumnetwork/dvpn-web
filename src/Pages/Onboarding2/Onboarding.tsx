/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useHistory } from 'react-router';

import { LOGIN } from '../../constants/routes';
import sideImage from '../../assets/images/onboarding/SideImage.png';

import Welcome from './Welcome';
import StepCounter from './StepCounter';
import TemsAndConditions from './TemsAndConditions';
import PriceSettings from './PriceSettings';
import Backup from './Backup';
import PayoutSettings from './PayoutSettings';
import PasswordChange from './PasswordSettings';

export default () => {
    const [thisState, setThisState] = React.useState({
        currentStep: 0,
    });

    const nextCallback = () => {
        setThisState({ ...thisState, currentStep: thisState.currentStep + 1 });
    };

    const history = useHistory();

    const steps = [
        <Welcome key="welcome" nextCallback={nextCallback} />,
        <TemsAndConditions key="terms" nextCallback={nextCallback} />,
        <PriceSettings key="price" nextCallback={nextCallback} />,
        <Backup key="backup" nextCallback={nextCallback} />,
        <PayoutSettings key="payout" nextCallback={nextCallback} />,
        <PasswordChange key="password" nextCallback={nextCallback} />,
    ];
    const totalStepCount = steps.length;

    if (steps.length - 1 < thisState.currentStep) {
        history.push(LOGIN);
    }
    const nextStepComponent = steps[thisState.currentStep];

    return (
        <div className="onboarding wrapper">
            <div className="steps">
                <div className="steps-content">
                    {nextStepComponent}
                    <StepCounter currentStep={thisState.currentStep} totalStepCount={totalStepCount} />
                </div>
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};
