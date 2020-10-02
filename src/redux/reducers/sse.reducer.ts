/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createSlice } from '@reduxjs/toolkit';

import { sseAppStateStateChanged, SSEState } from '../actions/sse';

const INITIAL_STATE: SSEState = {};

const slice = createSlice({
    name: 'sse',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [sseAppStateStateChanged.type]: (state, action) => {
            state.appState = action.payload;
        },
    },
});

export default slice.reducer;
