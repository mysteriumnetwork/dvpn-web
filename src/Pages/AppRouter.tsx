/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import '../assets/styles/App.scss';
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

import LoginPage from './Login/LoginPage';
import OnboardingPage from './Onboarding/OnboardingPage';
import RestartNode from './Error/RestartNode';
import PageNotFound from './Error/PageNotFound';
import IndexRoute from './IndexRoute';
import AuthenticatedPage from './Authenticated/AuthenticatedPage';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path={HOME} component={IndexRoute} />
            <Route exact path={LOGIN} component={LoginPage} />
            <Route exact path={ERROR} component={RestartNode} />
            <Route path={ONBOARDING_HOME} component={OnboardingPage} />
            <Route path={NOT_FOUND} component={PageNotFound} />
            <Route path={DASHBOARD} component={AuthenticatedPage} />
            <Route path={SESSIONS} component={AuthenticatedPage} />
            <Route path={SETTINGS} component={AuthenticatedPage} />
            <Route path={WALLET} component={AuthenticatedPage} />
            <Redirect from="*" to={NOT_FOUND} />
        </Switch>
    );
};
export default AppRouter;
