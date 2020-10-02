/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AppState, SSEEventType } from 'mysterium-vpn-js';
import { createAction } from '@reduxjs/toolkit';

export interface SSEState {
    appState?: AppState;
}

export const sseAppStateStateChanged = createAction<AppState>(SSEEventType.AppStateChange);
