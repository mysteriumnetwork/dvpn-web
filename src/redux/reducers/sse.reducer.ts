/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';

interface SSEState {
    appState?: AppState;
}

function sseReducer(state: SSEState = {}, action: SSEResponse): SSEState {
    switch (action.type) {
        case SSEEventType.AppStateChange:
            return {
                ...state,
                appState: action.payload,
            };
        default:
            return state;
    }
}

export default sseReducer;
