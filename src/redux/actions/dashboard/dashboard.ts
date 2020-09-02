/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'redux';
import { Session } from 'mysterium-vpn-js';
import { Action } from 'redux';

import { SESSION_FETCH_FULFILLED } from '../../actionTypes/DashboardTypes';
import { tequilapiClient } from '../../../api/TequilApiClient';

export interface DashboardState {
    sessions: {
        loading: boolean;
        sessions: Session[];
    };
}

export interface DashboardAction<T> extends Action {
    type: string;
    payload: T;
}

export type DashboardTypes = DashboardAction<DashboardState> | DashboardAction<Session[]>;

export const fetchSessions = (): ((dispatch: Dispatch) => void) => {
    return async (dispatch: Dispatch) => {
        const sessions = await tequilapiClient.sessions();
        dispatch({
            type: SESSION_FETCH_FULFILLED,
            payload: sessions,
        });
    };
};
