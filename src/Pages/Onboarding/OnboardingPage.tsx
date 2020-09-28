/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import { Terms } from '../../redux/reducers/app.reducer';

import { RootState } from '../../redux/store';
import sideImage from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/onboarding/main.scss';
// import { OnboardingState } from '../../redux/actions/onboard';
import isTermsAgreed from '../../commons/isTermsAgreed';

import PasswordChange from './steps/PasswordChange';
import Welcome from './steps/Welcome';
import StepCounter from './StepCounter';
import TermsAndConditions from './steps/TermsAndConditions';
import PriceSettings from './steps/PriceSettings';
import SettlementSettings from './steps/SettlementSettings';

const { Registered, InProgress } = IdentityRegistrationStatus;

const mapStateToProps = (state: RootState) => ({
    terms: state.app.terms,
    identity: state.general.currentIdentity,
});

interface Props {
    terms: Terms;
    identity?: Identity;
    defaultCredentials: boolean;
}

const isIdentityRegistered = (identity?: Identity): boolean => {
    return !!identity && (identity.registrationStatus === Registered || identity.registrationStatus === InProgress);
};

const OnboardingPage = ({ defaultCredentials, terms, identity }: Props) => {
    const [currentStep, setCurrentStep] = useState(0);

    const callbacks: OnboardingChildProps = {
        nextStep: (): void => {
            setCurrentStep(currentStep + 1);
        },
    };

    const steps = [
        <Welcome key="welcome" callbacks={callbacks} />,
    ];

    if (!isTermsAgreed(terms.acceptedAt, terms.acceptedVersion)) {
        steps.push(<TermsAndConditions key="terms" callbacks={callbacks} />);
    }

    if (!isIdentityRegistered(identity)) {
        steps.push(<PriceSettings key="price" callbacks={callbacks} />);
        steps.push(<SettlementSettings key="payout" callbacks={callbacks} />);
    }

    if (defaultCredentials) {
        steps.push(<PasswordChange key="password" callbacks={callbacks} />);
    }

    const totalStepCount = steps.length;
    const nextStepComponent = steps[currentStep];

    let content = <CircularProgress />;
    if (!!identity) {
        content = (
            <div className="steps-content">
                {nextStepComponent}
                <StepCounter currentStep={currentStep} totalStepCount={totalStepCount} />
            </div>
        );
    }

    return (
        <div className="onboarding wrapper">
            <div className="steps">
                {content}
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImage} />
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(OnboardingPage);
