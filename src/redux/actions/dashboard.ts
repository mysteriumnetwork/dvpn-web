/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch, Action } from 'redux';
import { Identity } from 'mysterium-vpn-js';
import { SessionResponse, SessionQuery } from 'mysterium-vpn-js/lib/session/session';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { tequilapiClient } from '../../api/TequilApiClient';
import { DEFAULT_IDENTITY_PASSPHRASE } from '../../constants/defaults';

import { IDENTITY_FETCH_FULFILLED, SESSION_FETCH_FULFILLED, USER_CONFIG_FETCH_FULFILLED } from './dashboard.actions';

export interface DashboardState {
    sessions: {
        isLoading: boolean;
        sessionResponse?: SessionResponse;
    };
    currentIdentity?: Identity;
    config: {
        isLoading: boolean;
        userConfig: Config;
    };
}

export interface DashboardAction<T> extends Action {
    type: string;
    payload: T;
}

export type DashboardTypes =
    | DashboardAction<DashboardState>
    | DashboardAction<SessionResponse>
    | DashboardAction<Identity>
    | DashboardAction<Config>;

export const fetchSessions = (query?: SessionQuery): ((dispatch: Dispatch) => void) => {
    return async (dispatch) => {
        const sessionResponse = await tequilapiClient.sessions(query);
        dispatch({
            type: SESSION_FETCH_FULFILLED,
            payload: sessionResponse,
        });
    };
};

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

export const fetchUserConfig = (): ((dispatch: Dispatch) => void) => {
    return async (dispatch) => {
        const config = await tequilapiClient.userConfig();
        dispatch({
            type: USER_CONFIG_FETCH_FULFILLED,
            payload: config,
        });
    };
};
