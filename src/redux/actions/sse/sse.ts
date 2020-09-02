/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, SSEEventType } from 'mysterium-vpn-js';

export interface SessionsStats {
    count: number;
    countConsumers: number;
    sumBytesReceived: number;
    sumBytesSent: number;
    sumDuration: number;
    sumTokens: number;
}

export interface AppStateV2 extends AppState {
    sessionsStats?: SessionsStats;
}

export interface SSEState {
    appState?: AppStateV2;
}

export interface SSEAction {
    type: SSEEventType;
    payload: AppStateV2;
}

export const sseAppStateStateChanged = (state: AppStateV2): SSEAction => {
    return {
        type: SSEEventType.AppStateChange,
        payload: state,
    };
};
