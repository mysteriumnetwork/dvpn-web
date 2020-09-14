/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js';

import { DashboardState, DashboardTypes } from '../actions/dashboard';
import { IDENTITY_FETCH_FULFILLED } from '../actions/dashboard';

const INITIAL_STATE: DashboardState = {
    currentIdentity: undefined,
};

function dashboardReducer(state: DashboardState = INITIAL_STATE, action: DashboardTypes): DashboardState {
    switch (action.type) {
        case IDENTITY_FETCH_FULFILLED: {
            return {
                ...state,
                currentIdentity: action.payload as Identity,
            };
        }
        default:
            return state;
    }
}

export default dashboardReducer;
