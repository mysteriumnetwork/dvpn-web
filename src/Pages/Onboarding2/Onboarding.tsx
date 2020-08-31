/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { LOGIN } from '../../constants/routes';
import sideImage from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/onboarding/main.scss';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import PayoutSettings from './steps/PayoutSettings';

const Onboarding: FC<any> = () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    const history = useHistory();

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    const steps = [
        <Welcome key="welcome" callbacks={callbacks} />,
        <TermsAndConditions key="terms" callbacks={callbacks} />,
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
