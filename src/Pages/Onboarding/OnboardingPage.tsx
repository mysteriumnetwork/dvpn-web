/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { DECIMAL_PART, Fees, Identity } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import { isIdentityRegistrationInProgress, isIdentityRegistered } from '../../commons/isIdentity.utils';

import sideImage from '../../assets/images/onboarding/SideImage.png';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import SettlementSettings from './steps/SettlementSettings';

import './Onboarding.scss';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import Topup from './steps/Topup';

interface Props {
    termsAccepted: boolean;
    identity?: Identity;
    needsPasswordChange: boolean;
    config?: Config;
    fees?: Fees;
}

const OnboardingPage = ({ needsPasswordChange, termsAccepted, identity, config, fees }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [stake, setStake] = useState(20);

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    if (!identity || !config || !fees) {
        return <CircularProgress className="spinner" />;
    }

    const resolveStake = (): number => {
        return stake ? stake * DECIMAL_PART : identity.stake; // TODO bad logic
    };

    const transferAmount = (): number => {
        return resolveStake() + fees.registration;
    };

    const steps = [<Welcome key="welcome" callbacks={callbacks} />];

    if (!termsAccepted) {
        steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />);
    }

    if (!isIdentityRegistered(identity) && !isIdentityRegistrationInProgress(identity)) {
        steps.push(<PriceSettings config={config} key="price" callbacks={callbacks} />);
        steps.push(
            <SettlementSettings
                key="payout"
                onSetStake={(s) => {
                    setStake(s);
                }}
                callbacks={callbacks}
            />,
        );
    }

    if (isIdentityRegistrationInProgress(identity)) {
        steps.push(
            <Topup
                key="topup"
                transferAmount={transferAmount()}
                channelAddress={identity.channelAddress}
                callbacks={callbacks}
            />,
        );
    }

    if (needsPasswordChange) {
        steps.push(<PasswordChange key="password" config={config} callbacks={callbacks} />);
    }

    const totalStepCount = steps.length;
    const nextStepComponent = steps[currentStep];

    return (
        <div className="onboarding">
            <div className="onboarding__content">
                <div className="steps">
                    {nextStepComponent}
                    <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
                </div>
            </div>
            <div className="onboarding__sidebar">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default OnboardingPage;
