/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { areTermsAccepted } from '../../commons/terms';
import { AUTHENTICATE, AppActionTypes, ACCEPT_TERMS, LOADING } from '../actions/app';

export interface Auth {
    authenticated?: boolean;
    withDefaultCredentials?: boolean;
}

export interface Terms {
    acceptedAt: string | undefined;
    acceptedVersion: string | undefined;
}

export interface AppState {
    loading: boolean;
    auth: Auth;
    terms: Terms;
}

const INITIAL_STATE: AppState = {
    loading: true,
    auth: {
        authenticated: false,
        withDefaultCredentials: false,
    },
    terms: {
        acceptedAt: undefined,
        acceptedVersion: undefined,
    },
};

function appReducer(state: AppState = INITIAL_STATE, action: AppActionTypes): AppState {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                auth: { ...(action.payload as Auth) },
            };
        }
        case ACCEPT_TERMS: {
            return {
                ...state,
                terms: { ...(action.payload as Terms) },
            };
        }
        case LOADING: {
            return {
                ...state,
                loading: action.payload as boolean,
            };
        }
        default:
            return state;
    }
}

function isLoggedIn(state: AppState): boolean {
    return !!state.auth.authenticated;
}

function needsPasswordChange(state: AppState): boolean {
    return !!state.auth.withDefaultCredentials;
}

function termsAccepted(state: AppState): boolean {
    return areTermsAccepted(state.terms.acceptedAt, state.terms.acceptedVersion);
}

function shouldBeOnboarded(state: AppState) {
    // TODO if !needsPasswordChange(state) then infinite loading
    // return !termsAccepted(state) || needsPasswordChange(state)
    return needsPasswordChange(state);
}

export { isLoggedIn, needsPasswordChange, termsAccepted, shouldBeOnboarded };

export default appReducer;
