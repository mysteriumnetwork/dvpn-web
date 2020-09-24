/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Dispatch, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

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
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        fetchIdentity: () => dispatch(fetchIdentity()),
    };
};

const AppRouter = ({ fetchIdentity }: Props): JSX.Element => {
    const history = useHistory();

    // TODO duct tape solution for fetching current identity on page refresh (by user)
    useEffect(() => {
        tequilapiClient
            .healthCheck()
            .then(() => fetchIdentity())
            .catch(() => {
                history.push(HOME);
            });
    }, []);

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
export default connect(null, mapDispatchToProps)(AppRouter);
