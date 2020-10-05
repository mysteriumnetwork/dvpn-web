/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import sseReducer from '../sse.slice';
import appReducer from '../app.slice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    sse: sseReducer,
    app: appReducer,
});

export default rootReducer;
