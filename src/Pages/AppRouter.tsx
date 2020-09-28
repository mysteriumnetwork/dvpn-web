/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core';
import React, { Dispatch, FC, useEffect, useLayoutEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import '../assets/styles/App.scss';
import ProtectedRoute from './ProtectedRoute';
import { AppState } from '../redux/reducers/app.reducer';
import { acceptTerms, authenticate, loading } from '../redux/actions/app';
import { RootState, store } from '../redux/store';
import { loginWithDefaultCredentials, isUserAuthenticated } from '../api/TequilAPIWrapper';

import {
    ERROR,
    HOME,
    LOGIN,
    NOT_FOUND,
    ONBOARDING_HOME,
    DASHBOARD,
    SESSIONS,
    WALLET,
    SETTINGS,
} from '../constants/routes';
import { fetchIdentity } from '../redux/actions/general';
import { tequilapiClient } from '../api/TequilApiClient';

import LoginPage from './Login/LoginPage';
import OnboardingPage from './Onboarding/OnboardingPage';
import RestartNode from './Error/RestartNode';
import PageNotFound from './Error/PageNotFound';
import IndexRoute from './IndexRoute';
import AuthenticatedPage from './Authenticated/AuthenticatedPage';

interface Props {
    fetchIdentity: () => void;
    loading: boolean;
    authenticated: boolean;
    withDefaultCredentials: boolean;
    onboarding: boolean;
}

const mapStateToProps = (state: RootState) => ({
    loading: state.app.loading,
    authenticated: state.app.auth.authenticated,
    withDefaultCredentials: state.app.auth.withDefaultCredentials,
    onboarding: state.app.auth.authenticated && (state.app.auth.withDefaultCredentials || !state.app.terms.acceptedAt),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchIdentity: () => dispatch(fetchIdentity()),
    };
};

interface Agreement {
    at?: string;
    version?: string;
}

const resolveTermsAgreement = (configData?: any): Agreement => {
    return configData?.mysteriumwebui?.termsAgreed || {};
};

const updateTermsStore = async () => {
    const userConfig = await tequilapiClient.userConfig();
    const { at, version } = resolveTermsAgreement(userConfig.data);
    store.dispatch(acceptTerms({
        acceptedAt: at,
        acceptedVersion: version,
    }));
};

const isUnauthenticatedDefaultPasswordFlow = async (onAuthentication: () => void) => {
    const withDefaultCredentials = await loginWithDefaultCredentials();

    if (withDefaultCredentials) { //login successful
        await updateTermsStore();

        store.dispatch(authenticate({
            authenticated: true,
            withDefaultCredentials: withDefaultCredentials,
        }));

        try {
            onAuthentication();
        } catch (e) {

        }
    }

    store.dispatch(loading(false));
};

const checkAuthenticatedFlow = async () => {
    const withDefaultCredentials = await loginWithDefaultCredentials();

    await updateTermsStore();

    store.dispatch(authenticate({
        authenticated: true,
        withDefaultCredentials: withDefaultCredentials,
    }));

    store.dispatch(loading(false));
};

const AppRouter = ({ loading, withDefaultCredentials, authenticated, onboarding, fetchIdentity }: Props) => {
    useLayoutEffect(() => {
        const doCheck = async () => {
            const isAuthenticated = await isUserAuthenticated();
            if (!isAuthenticated) {
                await isUnauthenticatedDefaultPasswordFlow(fetchIdentity);

                return;
            }

            await checkAuthenticatedFlow();

            fetchIdentity();
        };
        doCheck();
    }, []);

    console.log('loading', loading, 'onboarding', onboarding, 'auth', authenticated, 'defCreds', withDefaultCredentials);

    if (loading) {
        return (<CircularProgress className="spinner" />);
    }
    console.log('onboarding', onboarding, 'auth', authenticated, 'defCreds', withDefaultCredentials);
    let goTo = (<Redirect to={DASHBOARD} />);
    if (onboarding || withDefaultCredentials) {
        goTo = <Redirect to={ONBOARDING_HOME} />;
    } else if (!authenticated) {
        goTo = <Redirect to={LOGIN} />;
    }

    return (
        <Switch>
            <Route exact path={HOME}>
                {goTo}
            </Route>
            <Route exact path={LOGIN} render={(props) => {
                return !authenticated
                    // @ts-ignore
                    ? <LoginPage {...props} />
                    : <Redirect to={DASHBOARD} />;
            }
            } />
            <Route exact path={ONBOARDING_HOME} render={(props) => {
                return onboarding
                    ? <OnboardingPage {...props} defaultCredentials={withDefaultCredentials} />
                    : <Redirect to={DASHBOARD} />;
            }
            } />
            <Route exact path={ERROR} component={RestartNode} />
            <Route path={NOT_FOUND} component={PageNotFound} />

            <ProtectedRoute path={DASHBOARD} authenticated={authenticated} component={AuthenticatedPage} />
            <ProtectedRoute path={SESSIONS} authenticated={authenticated} component={AuthenticatedPage} />
            <ProtectedRoute path={SETTINGS} authenticated={authenticated} component={AuthenticatedPage} />
            <ProtectedRoute path={WALLET} authenticated={authenticated} component={AuthenticatedPage} />

            <Redirect from="*" to={NOT_FOUND} />
        </Switch>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
