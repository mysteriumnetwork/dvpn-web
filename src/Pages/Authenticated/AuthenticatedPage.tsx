/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import '../../assets/styles/pages/authenticated/main.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DASHBOARD, NOT_FOUND, SESSIONS, SETTINGS, WALLET } from '../../constants/routes';

import Dashboard from './Dashboard/Dashboard';
import Sessions from './Sessions/Sessions';
import Settings from './Settings/Settings';
import Wallet from './Wallet/Wallet';
import Navigation from './Components/Navigation';

const AuthenticatedPage: FC = () => {
    return (
        <div className="authenticated">
            <div className="authenticated--menu">
                <Navigation />
            </div>
            <div className="authenticated--content">
                <Switch>
                    <Route exact={true} path={DASHBOARD}>
                        <Dashboard />
                    </Route>
                    <Route exact={true} path={SESSIONS}>
                        <Sessions />
                    </Route>
                    <Route exact={true} path={SETTINGS}>
                        <Settings />
                    </Route>
                    <Route exact={true} path={WALLET}>
                        <Wallet />
                    </Route>
                    <Route path="*">
                        <Redirect to={NOT_FOUND} />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default AuthenticatedPage;
