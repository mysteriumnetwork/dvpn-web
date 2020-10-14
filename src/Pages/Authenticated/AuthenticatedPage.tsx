/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import '../../assets/styles/pages/authenticated/main.scss';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DASHBOARD, NOT_FOUND, SESSIONS, SETTINGS, WALLET } from '../../constants/routes';

import Dashboard from './Dashboard/Dashboard';
import Sessions from './Sessions/Sessions';
import Settings from './Settings/Settings';
import Wallet from './Wallet/Wallet';
import Navigation from './Components/Navigation';
import { CircularProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Identity } from 'mysterium-vpn-js';
import { isRegistered } from '../../commons/isIdentity.utils';
import CopyToClipboard from '../../Components/CopyToClipboard/CopyToClipboard';

const RegistrationOverlay = ({ identityRef }: { identityRef: string }) => {
    return (
        <div className="registration-overlay">
            <div className="registration-overlay__content">
                <CircularProgress className="m-r-10" />
                <h2>Your identity is being registered, please be patient...</h2>
            </div>
            <div className="registration-overlay__footer">
                <span className="registration-overlay__identity">{identityRef}</span>
                <CopyToClipboard text={identityRef} />
            </div>
        </div>
    );
};

const HelpArrow = () => {
    return (
        <div className="intercom-help-pointer">
            <ArrowBackIcon className="intercom-help-pointer__arrow" fontSize="large" />
            <h2>have questions? Talk to us!</h2>
        </div>
    );
};

interface Props {
    identity?: Identity;
}

const displayOverlay = (identity?: Identity): boolean => {
    if (!identity) {
        return false;
    }

    return !isRegistered(identity);
};

const AuthenticatedPage = ({ identity }: Props) => {
    return (
        <div className="page">
            {true && (
                <>
                    <RegistrationOverlay identityRef={identity?.id || ''} />
                    <HelpArrow />
                </>
            )}
            <div className="page__menu">
                <Navigation />
            </div>
            <div className="page__content">
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
