/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, SessionResponse } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { DashboardState, DashboardTypes } from '../actions/dashboard';
import {
    IDENTITY_FETCH_FULFILLED,
    SESSION_FETCH_FULFILLED,
    USER_CONFIG_FETCH_FULFILLED,
} from '../actions/dashboard.actions';

const INITIAL_STATE: DashboardState = {
    sessions: {
        isLoading: true,
        sessionResponse: undefined,
    },
    currentIdentity: undefined,
    config: {
        isLoading: true,
        userConfig: { data: undefined },
    },
};

function dashboardReducer(state: DashboardState = INITIAL_STATE, action: DashboardTypes): DashboardState {
    switch (action.type) {
        case SESSION_FETCH_FULFILLED: {
            return {
                ...state,
                sessions: {
                    isLoading: false,
                    sessionResponse: action.payload as SessionResponse,
                },
            };
        }
        case IDENTITY_FETCH_FULFILLED: {
            return {
                ...state,
                currentIdentity: action.payload as Identity,
            };
        }
        case USER_CONFIG_FETCH_FULFILLED: {
            return {
                ...state,
                config: {
                    isLoading: false,
                    userConfig: action.payload as Config,
                },
            };
        }
        default:
            return state;
    }
}

export default dashboardReducer;
