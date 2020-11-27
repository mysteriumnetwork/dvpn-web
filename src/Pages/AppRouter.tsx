/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core';
import { AppState, Fees, Identity } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import React, { Dispatch, useEffect, useLayoutEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import '../assets/styles/App.scss';
import { sseAppStateStateChanged, SSEState } from '../redux/sse.slice';
import ConnectToSSE from '../sse/server-sent-events';
import { Auth, Onboarding, isLoggedIn, currentIdentity, onboardingState } from '../redux/app.slice';
import { fetchConfigAsync, fetchFeesAsync, updateTermsStoreAsync } from '../redux/app.async.actions';
import { updateAuthenticatedStore, updateAuthFlowLoadingStore } from '../redux/app.slice';
import { RootState } from '../redux/store';
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
import { fetchIdentityAsync } from '../redux/app.async.actions';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from './Login/LoginPage';
import OnboardingPage from './Onboarding/OnboardingPage';
import RestartNode from './Error/RestartNode';
import PageNotFound from './Error/PageNotFound';
import AuthenticatedPage from './Authenticated/AuthenticatedPage';

interface Props {
    config?: Config;
    loading: boolean;
    loggedIn: boolean;
    identity?: Identity;
    onboarding: Onboarding;
    fees?: Fees;
    sse?: SSEState;
    actions: {
        fetchIdentityAsync: () => void;
        fetchConfigAsync: () => void;
        updateTermsStoreAsync: () => void;
        fetchFeesAsync: () => void;
        updateAuthenticatedStore: (auth: Auth) => void;
        updateAuthFlowLoadingStore: (loading: boolean) => void;
        sseAppStateStateChanged: (state: AppState) => void;
    };
}

const mapStateToProps = (state: RootState) => ({
    config: state.app.config,
    loading: state.app.loading,
    loggedIn: isLoggedIn(state.app.auth),
    identity: currentIdentity(state.app.currentIdentityRef, state.sse.appState?.identities),
    onboarding: onboardingState(state.app.auth, state.app.terms, state.app.currentIdentity),
    fees: state.app.fees,
    sse: state.sse,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: {
            fetchIdentityAsync: () => dispatch(fetchIdentityAsync()),
            fetchConfigAsync: () => dispatch(fetchConfigAsync()),
            updateTermsStoreAsync: () => dispatch(updateTermsStoreAsync()),
            fetchFeesAsync: () => dispatch(fetchFeesAsync()),
            updateAuthenticatedStore: (auth: Auth) => dispatch(updateAuthenticatedStore(auth)),
            updateAuthFlowLoadingStore: (loading: boolean) => dispatch(updateAuthFlowLoadingStore(loading)),
            sseAppStateStateChanged: (state: AppState) => dispatch(sseAppStateStateChanged(state)),
        },
    };
};

const redirectTo = (needsOnboarding: boolean, loggedIn: boolean): JSX.Element => {
    if (!loggedIn) {
        return <Redirect to={LOGIN} />;
    }
    if (needsOnboarding) {
        return <Redirect to={ONBOARDING_HOME} />;
    }

    return <Redirect to={DASHBOARD} />;
};

const AppRouter = ({ config, loading, identity, loggedIn, onboarding, fees, actions }: Props) => {
    const loginActions = () => {
        actions.fetchIdentityAsync();
        actions.fetchConfigAsync();
        actions.fetchFeesAsync();
    };

    const authenticatedFlow = async () => {
        actions.updateAuthenticatedStore({
            authenticated: true,
            withDefaultCredentials: await loginWithDefaultCredentials(),
        });
        await actions.updateTermsStoreAsync();
        actions.updateAuthFlowLoadingStore(false);
        loginActions();
    };

    useLayoutEffect(() => {
        const blockingCheck = async () => {
            const authenticated = await isUserAuthenticated();
            const defaultCredentials = await loginWithDefaultCredentials();

            if (defaultCredentials) {
                actions.fetchConfigAsync();
            }

            if (!authenticated && !defaultCredentials) {
                actions.updateAuthFlowLoadingStore(false);
            } else {
                await authenticatedFlow();
            }
        };
        blockingCheck();
    }, []);

    useEffect(() => {
        if (!loggedIn) {
            return;
        }

        ConnectToSSE((state: AppState) => actions.sseAppStateStateChanged(state));
    }, [loggedIn]);

    const authenticatedPage = (props: any) => {
        return <AuthenticatedPage identity={identity} {...props} />;
    };

    if (loading) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <Switch>
            <Route exact path={HOME}>
                {redirectTo(onboarding.needsOnboarding, loggedIn)}
            </Route>
            <Route
                exact
                path={LOGIN}
                render={() => {
                    return !loggedIn ? <LoginPage onSuccessLogin={loginActions} /> : <Redirect to={DASHBOARD} />;
                }}
            />
            <Route
                exact
                path={ONBOARDING_HOME}
                render={(props) => {
                    return onboarding.needsOnboarding ? (
                        <OnboardingPage
                            {...props}
                            onboarding={onboarding}
                            config={config}
                            fees={fees}
                            identity={identity}
                        />
                    ) : (
                        <Redirect to={DASHBOARD} />
                    );
                }}
            />
            <Route exact path={ERROR} component={RestartNode} />
            <Route path={NOT_FOUND} component={PageNotFound} />

            <ProtectedRoute
                path={DASHBOARD}
                needsOnboarding={onboarding.needsOnboarding}
                loggedIn={loggedIn}
                component={authenticatedPage}
            />
            <ProtectedRoute
                path={SESSIONS}
                needsOnboarding={onboarding.needsOnboarding}
                loggedIn={loggedIn}
                component={authenticatedPage}
            />
            <ProtectedRoute
                path={SETTINGS}
                needsOnboarding={onboarding.needsOnboarding}
                loggedIn={loggedIn}
                component={authenticatedPage}
            />
            <ProtectedRoute
                path={WALLET}
                needsOnboarding={onboarding.needsOnboarding}
                loggedIn={loggedIn}
                component={authenticatedPage}
            />

            <Redirect from="*" to={NOT_FOUND} />
        </Switch>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
