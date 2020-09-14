/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch, Action } from 'redux';
import { Identity } from 'mysterium-vpn-js';

import { tequilapiClient } from '../../api/TequilApiClient';
import { DEFAULT_IDENTITY_PASSPHRASE } from '../../constants/defaults';

export const IDENTITY_FETCH_FULFILLED = 'dashboard/IDENTITY_FETCH_FULFILLED';

export interface GeneralState {
    currentIdentity?: Identity;
}

export interface GeneralAction<T> extends Action {
    type: string;
    payload: T;
}

export type GeneralTypes = GeneralAction<GeneralState> | GeneralAction<Identity>;

export const fetchIdentity = (): ((dispatch: Dispatch) => void) => {
    return async (dispatch) => {
        const identity = await tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((identityRef) => tequilapiClient.identity(identityRef.id));
        dispatch({
            type: IDENTITY_FETCH_FULFILLED,
            payload: identity,
        });
    };
};
