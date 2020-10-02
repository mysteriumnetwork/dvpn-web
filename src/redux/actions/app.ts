/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Action } from 'redux';
import { Dispatch } from 'react';
import { Identity } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { createAction } from '@reduxjs/toolkit';

import { Auth, Terms } from '../reducers/app.reducer';
import { tequilapiClient } from '../../api/TequilApiClient';
import { resolveTermsAgreement } from '../../commons/terms';
import { DEFAULT_IDENTITY_PASSPHRASE } from '../../constants/defaults';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const LOADING = 'LOADING';
export const IDENTITY_FETCH_FULFILLED = 'IDENTITY_FETCH_FULFILLED';
export const CONFIG_FETCH_FULFILLED = 'CONFIG_FETCH_FULFILLED';

export interface AppAction<T> extends Action {
    type: string;
    payload: T;
}

export type AppActionTypes =
    | AppAction<Auth>
    | AppAction<Terms>
    | AppAction<boolean>
    | AppAction<Identity>
    | AppAction<Config>;

export const updateAuthenticatedStore = createAction<Auth>(AUTHENTICATE);
export const acceptTerms = createAction<Terms>(ACCEPT_TERMS);
export const updateAuthFlowLoadingStore = createAction<boolean>(LOADING);
export const updateIdentityStore = createAction<Identity>(IDENTITY_FETCH_FULFILLED);
export const updateConfigStore = createAction<Config>(CONFIG_FETCH_FULFILLED);

export const updateTermsStoreAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const userConfig = await tequilapiClient.userConfig();
        const { at, version } = resolveTermsAgreement(userConfig.data);
        dispatch(
            acceptTerms({
                acceptedAt: at,
                acceptedVersion: version,
            })
        );
    };
};

export const fetchIdentityAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const identity = await tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((identityRef) => tequilapiClient.identity(identityRef.id));
        dispatch(updateIdentityStore(identity));
    };
};

export const fetchConfigAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const config = await tequilapiClient.config();
        dispatch(updateConfigStore(config));
    };
};
