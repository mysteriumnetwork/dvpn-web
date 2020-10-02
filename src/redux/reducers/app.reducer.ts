/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { createReducer } from '@reduxjs/toolkit';

import { areTermsAccepted } from '../../commons/terms';
import { acceptTerms, updateIdentityStore, updateAuthFlowLoadingStore, updateConfigStore } from '../actions/app';
import { updateAuthenticatedStore } from '../actions/app';

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

export const appReducer = createReducer(INITIAL_STATE, {
    [updateAuthenticatedStore.type]: (state, action) => {
        state.auth = action.payload;
    },
    [updateIdentityStore.type]: (state, action) => {
        state.currentIdentity = action.payload;
    },
    [acceptTerms.type]: (state, action) => {
        state.terms = action.payload;
    },
    [updateAuthFlowLoadingStore.type]: (state, action) => {
        state.loading = action.payload;
    },
    [updateConfigStore.type]: (state, action) => {
        state.config = action.payload;
    },
});

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
