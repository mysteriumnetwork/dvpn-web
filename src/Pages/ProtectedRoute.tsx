/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN, ONBOARDING_HOME } from '../constants/routes';

interface Props {
    component: any;
    loggedIn: boolean;
    needsOnboarding: boolean;
    path: string;
}

const redirectComponent = (needsOnboarding: boolean, loggedIn: boolean): JSX.Element | null => {
    if (!loggedIn) {
        return <Redirect to={LOGIN} />;
    }
    if (needsOnboarding) {
        return <Redirect to={ONBOARDING_HOME} />;
    }

    return null;
};

const ProtectedRoute = ({ component: Component, loggedIn, needsOnboarding, ...rest }: Props): JSX.Element => {
    const redirect = redirectComponent(needsOnboarding, loggedIn);

    return (
        <Route
            {...rest}
            render={(props) => {
                return redirect || <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
