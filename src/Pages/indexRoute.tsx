import React, { useEffect } from 'react';
import { LOGIN, ONBOARDING_HOME } from '../constants/routes';
import { Redirect } from 'react-router';
import { RootState } from '../redux/store';
import { shouldOnBoard } from '../redux/actions/onboarding/onboard';
import { OnboardingState } from '../redux/actions/onboarding/onboard.d';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const mapStateToProps = (state: RootState) => ({
    onboarding: state.onboarding,
});

const mapDispatchToProps = { shouldOnBoard };

interface PropsInterface {
    onboarding: OnboardingState;
    shouldOnBoard: Function;
}

const IndexRoute = (props: PropsInterface) => {
    useEffect(() => {
        props.shouldOnBoard();
    });

    const { isDefaultCredentials, isLoading } = props.onboarding;
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
