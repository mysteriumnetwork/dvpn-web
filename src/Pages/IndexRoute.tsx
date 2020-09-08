/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { LOGIN, ONBOARDING_HOME } from '../constants/routes';
import { RootState } from '../redux/store';
import { OnboardingState } from '../redux/actions/onboard';
import isTermsAgreed from '../commons/isTermsAgreed';

const mapStateToProps = (state: RootState) => ({
    onboarding: state.onboarding,
});

interface Props {
    onboarding: OnboardingState;
}

const isOnboardingChecksPending = (state: OnboardingState): boolean => {
    const { isDefaultCredentialsChecked, isDefaultCredentials, isTermsAgreementChecked } = state;
    if (isDefaultCredentialsChecked && !isDefaultCredentials) {
        return false;
    }
    return !(isDefaultCredentialsChecked && isTermsAgreementChecked);
};

const isNeedsOnboarding = (state: OnboardingState): boolean => {
    if (!state.isDefaultCredentials) {
        return false;
    }
    return state.isDefaultCredentials || !isTermsAgreed(state.termsAgreedAt, state.termsAgreedVersion);
};

const IndexRoute: React.FC<Props> = ({ onboarding }) => {
    if (isOnboardingChecksPending(onboarding)) {
        return <CircularProgress className="spinner" />;
    }

    return isNeedsOnboarding(onboarding) ? <Redirect to={ONBOARDING_HOME} /> : <Redirect to={LOGIN} />;
};

export default connect(mapStateToProps)(IndexRoute);
