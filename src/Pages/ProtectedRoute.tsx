import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../constants/routes';

// @ts-ignore
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => {
        return authenticated === true
            ? <Component {...props} />
            : <Redirect to={LOGIN} />
    }} />
);

export default ProtectedRoute;
