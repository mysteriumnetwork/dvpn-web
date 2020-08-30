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

import Login from './Login/Login';
import Onboarding from './Onboarding2/Onboarding';
import RestartNode from './Error/RestartNode';
import PageNotFound from './Error/PageNotFound';
import IndexRoute from './IndexRoute';
import Authenticated from './Authenticated/Authenticated';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path={HOME} component={IndexRoute} />
            <Route exact path={LOGIN} component={Login} />
            <Route exact path={ERROR} component={RestartNode} />
            <Route path={ONBOARDING_HOME} component={Onboarding} />
            <Route path={NOT_FOUND} component={PageNotFound} />
            <Route path={DASHBOARD} component={Authenticated} />
            <Route path={SESSIONS} component={Authenticated} />
            <Route path={SETTINGS} component={Authenticated} />
            <Route path={WALLET} component={Authenticated} />
            <Redirect from="*" to={NOT_FOUND} />
        </Switch>
    );
};
export default AppRouter;
