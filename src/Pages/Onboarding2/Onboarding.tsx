/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { CircularProgress, LinearProgress } from '@material-ui/core';

import { LOGIN } from '../../constants/routes';
import sideImage from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/onboarding/main.scss';

import PasswordChange from './steps/PasswordSettings';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TemsAndConditions from './steps/TemsAndConditions';
import PriceSettings from './steps/PriceSettings';
import PayoutSettings from './steps/PayoutSettings';

const Onboarding: FC<any> = () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [isSpinnerShown, setShowSpinner] = React.useState(false);

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const showSpinner = () => {
        setShowSpinner(true);
    };

    const hideSpinner = () => {
        setShowSpinner(false);
    };

    const history = useHistory();

    const callbacks: OnboardingChildProps = {
        nextStep: nextStep,
        showSpinner: showSpinner,
        hideSpinner: hideSpinner,
    };

    const steps = [
        <Welcome key="welcome" callbacks={callbacks} />,
        <TemsAndConditions key="terms" callbacks={callbacks} />,
        <PriceSettings key="price" callbacks={callbacks} />,
        // Backup is disabled for initial release
        // <Backup key="backup" callbacks={callbacks} />,
        <PayoutSettings key="payout" callbacks={callbacks} />,
        <PasswordChange key="password" callbacks={callbacks} />,
    ];
    const totalStepCount = steps.length;

    if (steps.length - 1 < currentStep) {
        history.push(LOGIN);
    }
    const nextStepComponent = steps[currentStep];

    return (
        <div className="onboarding wrapper">
            {isSpinnerShown && <CircularProgress size="4rem" className="spinner" />}
            <div className="steps">
                <div className="steps-content">
                    {nextStepComponent}
                    <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
                </div>
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default Onboarding;
