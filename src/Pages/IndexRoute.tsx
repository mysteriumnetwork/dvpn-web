/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { LOGIN, ONBOARDING_HOME } from '../constants/routes';
import { RootState } from '../redux/store';
import { shouldOnBoard } from '../redux/actions/onboarding/onboard';
import { OnboardingState } from '../redux/actions/onboarding/onboard.d';

const mapStateToProps = (state: RootState) => ({
    onboarding: state.onboarding,
});

const mapDispatchToProps = { shouldOnBoard };

interface Props {
    onboarding: OnboardingState;
    shouldOnBoard: () => void;
}

const IndexRoute: React.FC<Props> = ({ onboarding, shouldOnBoard }) => {
    useEffect(() => {
        shouldOnBoard();
    });

    const { isDefaultCredentials, isLoading } = onboarding;
    if (isLoading) {
        return (
            <div className="index-route-spinner">
                <CircularProgress />
            </div>
        );
    }

    return isDefaultCredentials ? <Redirect to={ONBOARDING_HOME} /> : <Redirect to={LOGIN} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexRoute);
