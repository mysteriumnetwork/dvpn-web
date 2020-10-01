/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers } from 'redux';

import sseReducer from './sse.reducer';
import appReducer from './app.reducer';

const rootReducer = combineReducers({
    sse: sseReducer,
    app: appReducer,
});

export default rootReducer;
