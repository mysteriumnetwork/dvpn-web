/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Action } from 'redux';
import { Dispatch } from 'react';

import { Auth, Terms } from '../reducers/app.reducer';
import { tequilapiClient } from '../../api/TequilApiClient';
import { resolveTermsAgreement } from '../../commons/terms';
import { store } from '../store';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const LOADING = 'LOADING';

export interface AppAction<T> extends Action {
    type: string;
    payload: T;
}

export type AppActionTypes = AppAction<Auth> | AppAction<Terms> | AppAction<boolean>;

export const updateAuthenticatedStore = (auth: Auth): AppAction<Auth> => {
    return {
        type: AUTHENTICATE,
        payload: auth,
    };
};

export const acceptTerms = (terms: Terms): AppAction<Terms> => {
    return {
        type: ACCEPT_TERMS,
        payload: terms,
    };
};

export const updateAuthFlowLoadingStore = (loading: boolean): AppAction<boolean> => {
    return {
        type: LOADING,
        payload: loading,
    };
};

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
