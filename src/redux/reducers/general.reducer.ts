/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js';

import { GeneralState, GeneralTypes } from '../actions/general';
import { IDENTITY_FETCH_FULFILLED } from '../actions/general';

const INITIAL_STATE: GeneralState = {
    currentIdentity: undefined,
};

function generalReducer(state: GeneralState = INITIAL_STATE, action: GeneralTypes): GeneralState {
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

export default generalReducer;
