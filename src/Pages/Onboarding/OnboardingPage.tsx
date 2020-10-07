/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Identity } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import isIdentityRegistered from '../../commons/isIdentityRegistered';

import sideImage from '../../assets/images/onboarding/SideImage.png';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import SettlementSettings from './steps/SettlementSettings';

import './Onboarding.scss';
import { Config } from 'mysterium-vpn-js/lib/config/config';

interface Props {
    termsAccepted: boolean;
    identity?: Identity;
    needsPasswordChange: boolean;
    config: Config;
}

const OnboardingPage = ({ needsPasswordChange, termsAccepted, identity, config }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    const steps = [<Welcome key="welcome" callbacks={callbacks} />];

    if (!termsAccepted) {
        steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />);
    }

    if (!isIdentityRegistered(identity)) {
        steps.push(<PriceSettings config={config} key="price" callbacks={callbacks} />);
        steps.push(<SettlementSettings key="payout" callbacks={callbacks} />);
    }

    if (needsPasswordChange) {
        steps.push(<PasswordChange key="password" config={config} callbacks={callbacks} />);
    }

    const totalStepCount = steps.length;
    const nextStepComponent = steps[currentStep];

    let content = <CircularProgress />;
    if (!!identity) {
        content = (
            <div className="steps">
                {nextStepComponent}
                <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
            </div>
        );
    }

    return (
        <div className="onboarding">
            <div className="onboarding__content">{content}</div>
            <div className="onboarding__sidebar">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default OnboardingPage;
