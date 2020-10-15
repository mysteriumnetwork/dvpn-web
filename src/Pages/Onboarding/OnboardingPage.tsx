/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Fees, Identity } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import { isUnregistered } from '../../commons/isIdentity.utils';

import sideImage from '../../assets/images/onboarding/SideImage.png';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import SettlementSettings from './steps/SettlementSettings';

import './Onboarding.scss';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { SSEState } from '../../redux/sse.slice';
import _ from 'lodash';

interface Props {
    termsAccepted: boolean;
    identity?: Identity;
    needsPasswordChange: boolean;
    config?: Config;
    fees?: Fees;
    sse?: SSEState;
}

export interface SettlementProps {
    stake: number;
    beneficiary: string;
}

const OnboardingPage = ({ needsPasswordChange, termsAccepted, identity, config, fees, sse }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    const currentSSEIdentity = (): Identity | undefined => {
        const sseIdentities = sse?.appState?.identities || [];
        sseIdentities.filter((si) => si.id === identity?.id);
        return _.first(sseIdentities);
    };

    const sseIdentity = currentSSEIdentity();

    if (!sse || !sseIdentity || !config || !fees) {
        return <CircularProgress className="spinner" />;
    }

    const steps = [<Welcome key="welcome" callbacks={callbacks} />];

    if (!termsAccepted) {
        steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />);
    }

    if (isUnregistered(sseIdentity)) {
        steps.push(<PriceSettings config={config} key="price" callbacks={callbacks} />);
        steps.push(<SettlementSettings key="payout" identity={sseIdentity} callbacks={callbacks} fees={fees} />);
    }

    if (needsPasswordChange) {
        steps.push(<PasswordChange key="password" config={config} callbacks={callbacks} />);
    }

    const totalStepCount = steps.length;
    const nextStepComponent = steps[currentStep > steps.length - 1 ? steps.length - 1 : currentStep];

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
