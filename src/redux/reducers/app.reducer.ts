/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { areTermsAccepted } from '../../commons/terms';
import { AUTHENTICATE, AppActionTypes, ACCEPT_TERMS, LOADING, CONFIG_FETCH_FULFILLED } from '../actions/app';
import { IDENTITY_FETCH_FULFILLED } from '../actions/app';

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
    currentIdentity?: Identity;
    auth: Auth;
    terms: Terms;
    config?: Config;
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
        case IDENTITY_FETCH_FULFILLED: {
            return {
                ...state,
                currentIdentity: action.payload as Identity,
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
        case CONFIG_FETCH_FULFILLED: {
            return {
                ...state,
                config: action.payload as Config,
            };
        }
        default:
            return state;
    }
}

const isLoggedIn = (state: AppState): boolean => {
    return !!state.auth.authenticated;
};

const needsPasswordChange = (state: AppState): boolean => {
    return !!state.auth.withDefaultCredentials;
};

const termsAccepted = (state: AppState): boolean => {
    return areTermsAccepted(state.terms.acceptedAt, state.terms.acceptedVersion);
};

const shouldBeOnboarded = (state: AppState): boolean => {
    // TODO if !needsPasswordChange(state) then infinite loading
    // return !termsAccepted(state) || needsPasswordChange(state)
    return needsPasswordChange(state);
};

export { isLoggedIn, needsPasswordChange, termsAccepted, shouldBeOnboarded };

export default appReducer;
