/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';

import { LOGIN } from '../../constants/routes';
import { RootState } from '../../redux/store';
import sideImage from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/onboarding/main.scss';
import { OnboardingState } from '../../redux/actions/onboard';
import isTermsAgreed from '../../commons/isTermsAgreed';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import SettlementSettings from './steps/SettlementSettings';

const { Registered, InProgress } = IdentityRegistrationStatus;

const mapStateToProps = (state: RootState) => ({
    onboarding: state.onboarding,
    identity: state.general.currentIdentity,
});

interface Props {
    onboarding: OnboardingState;
    identity?: Identity;
}

const isIdentityRegistered = (identity?: Identity): boolean => {
    return !!identity && (identity.registrationStatus === Registered || identity.registrationStatus === InProgress);
};

const OnboardingPage: FC<Props> = ({ onboarding, identity }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const { isDefaultCredentials, termsAgreedAt, termsAgreedVersion } = onboarding;

    const history = useHistory();

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    const steps = [
        <Welcome key="welcome" callbacks={callbacks} />,
    ];

    if (!isTermsAgreed(termsAgreedAt, termsAgreedVersion)) {
        steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />);
    }

    if (!isIdentityRegistered(identity)) {
        steps.push(<PriceSettings key="price" callbacks={callbacks} />);
        steps.push(<SettlementSettings key="payout" callbacks={callbacks} />);
    }

    steps.push(<PasswordChange key="password" callbacks={callbacks} />);

    const totalStepCount = steps.length;

    if (!isDefaultCredentials || steps.length - 1 < currentStep) {
        // history.push(LOGIN);
    }
    const nextStepComponent = steps[currentStep];

    return (
        <div className="onboarding wrapper">
            <div className="steps">
                {!!identity ? (
                    <div className="steps-content">
                        {nextStepComponent}
                        <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
                    </div>
                ) : (
                    <CircularProgress />
                )}
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(OnboardingPage);
