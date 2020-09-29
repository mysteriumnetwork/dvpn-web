/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CircularProgress } from '@material-ui/core';
import { Identity } from 'mysterium-vpn-js';
import React, { Dispatch, useLayoutEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import '../assets/styles/App.scss';
import { Auth, isLoggedIn, needsPasswordChange, shouldBeOnboarded, termsAccepted } from '../redux/reducers/app.reducer';
import { getIdentity } from '../redux/reducers/general.reducer';
import { updateAuthenticatedStore, updateAuthFlowLoadingStore, updateTermsStoreAsync } from '../redux/actions/app';
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
import { fetchIdentity } from '../redux/actions/general';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from './Login/LoginPage';
import OnboardingPage from './Onboarding/OnboardingPage';
import RestartNode from './Error/RestartNode';
import PageNotFound from './Error/PageNotFound';
import AuthenticatedPage from './Authenticated/AuthenticatedPage';

interface Props {
    loading: boolean;
    identity?: Identity;
    loggedIn: boolean;
    termsAccepted: boolean;
    needsPasswordChange: boolean;
    needsOnboarding: boolean;
    actions: {
        fetchIdentity: () => void;
        updateTermsStoreAsync: () => void;
        updateAuthenticatedStore: (auth: Auth) => void;
        updateAuthFlowLoadingStore: (loading: boolean) => void;
    };
}

const mapStateToProps = (state: RootState) => ({
    loading: state.app.loading,
    identity: getIdentity(state.general),

    loggedIn: isLoggedIn(state.app),
    termsAccepted: termsAccepted(state.app),
    needsPasswordChange: needsPasswordChange(state.app),
    needsOnboarding: shouldBeOnboarded(state.app),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: {
            fetchIdentity: () => dispatch(fetchIdentity()),
            updateTermsStoreAsync: () => dispatch(updateTermsStoreAsync()),
            updateAuthenticatedStore: (auth: Auth) => dispatch(updateAuthenticatedStore(auth)),
            updateAuthFlowLoadingStore: (loading: boolean) => dispatch(updateAuthFlowLoadingStore(loading)),
        },
    };
};

const redirectTo = (needsOnboarding: boolean, loggedIn: boolean): JSX.Element => {
    if (needsOnboarding) {
        return <Redirect to={ONBOARDING_HOME} />;
    } else if (!loggedIn) {
        return <Redirect to={LOGIN} />;
    }

    return <Redirect to={DASHBOARD} />;
};

const AppRouter = ({
    loading,
    identity,
    loggedIn,
    needsOnboarding,
    needsPasswordChange,
    termsAccepted,
    actions,
}: Props) => {
    const authenticatedFlow = async () => {
        actions.updateAuthenticatedStore({
            authenticated: true,
            withDefaultCredentials: await loginWithDefaultCredentials(),
        });
        await actions.updateTermsStoreAsync();
        actions.updateAuthFlowLoadingStore(false);
        actions.fetchIdentity();
    };

    useLayoutEffect(() => {
        const blockingCheck = async () => {
            const authenticated = await isUserAuthenticated();
            const defaultCredentials = await loginWithDefaultCredentials();
            if (!authenticated && !defaultCredentials) {
                actions.updateAuthFlowLoadingStore(false);
            } else {
                await authenticatedFlow();
            }
        };
        blockingCheck();
    }, []);

    if (loading) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <Switch>
            <Route exact path={HOME}>
                {redirectTo(needsOnboarding, loggedIn)}
            </Route>
            <Route
                exact
                path={LOGIN}
                render={() => {
                    return !loggedIn ? <LoginPage /> : <Redirect to={DASHBOARD} />;
                }}
            />
            <Route
                exact
                path={ONBOARDING_HOME}
                render={(props) => {
                    return needsOnboarding ? (
                        <OnboardingPage
                            {...props}
                            identity={identity}
                            termsAccepted={termsAccepted}
                            needsPasswordChange={needsPasswordChange}
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
                needsOnboarding={needsOnboarding}
                loggedIn={loggedIn}
                component={AuthenticatedPage}
            />
            <ProtectedRoute
                path={SESSIONS}
                needsOnboarding={needsOnboarding}
                loggedIn={loggedIn}
                component={AuthenticatedPage}
            />
            <ProtectedRoute
                path={SETTINGS}
                needsOnboarding={needsOnboarding}
                loggedIn={loggedIn}
                component={AuthenticatedPage}
            />
            <ProtectedRoute
                path={WALLET}
                needsOnboarding={needsOnboarding}
                loggedIn={loggedIn}
                component={AuthenticatedPage}
            />

            <Redirect from="*" to={NOT_FOUND} />
        </Switch>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
