/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Identity, MMNReportResponse, SessionResponse} from 'mysterium-vpn-js';

import { DashboardState, DashboardTypes } from '../actions/dashboard/dashboard';
import {
    IDENTITY_FETCH_FULFILLED,
    MMN_REPORT_FETCH_FULFILLED,
    SESSION_FETCH_FULFILLED,
} from '../actionTypes/DashboardTypes';

const INITIAL_STATE: DashboardState = {
    sessions: {
        isLoading: true,
        sessionResponse: undefined,
    },
    mmn: {
        isLoading: true,
        reportResponse: undefined,
    },
    currentIdentity: undefined,
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
        case MMN_REPORT_FETCH_FULFILLED: {
            return {
                ...state,
                mmn: {
                    isLoading: false,
                    reportResponse: action.payload as MMNReportResponse,
                },
            };
        }
        default:
            return state;
    }
}

export default dashboardReducer;
