/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';

export const sseAppStateStateChanged = (state: AppState): SSEResponse => {
    return {
        type: SSEEventType.AppStateChange,
        payload: state,
    };
};
