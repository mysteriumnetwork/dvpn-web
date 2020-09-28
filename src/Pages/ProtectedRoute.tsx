import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN, ONBOARDING_HOME } from '../constants/routes';

// @ts-ignore
const ProtectedRoute = ({ component: Component, loggedIn, needsOnboarding, ...rest }) => {
    let redirect: any = null;
    if (!loggedIn) {
        redirect = <Redirect to={LOGIN} />;
    }
    if (needsOnboarding) {
        redirect = <Redirect to={ONBOARDING_HOME} />;
    }

    return (
        <Route {...rest} render={(props) => {
            return !redirect
                ? <Component {...props} />
                : redirect;
        }} />
    );
};

export default ProtectedRoute;
