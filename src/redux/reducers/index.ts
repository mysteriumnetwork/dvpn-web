/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers } from 'redux';

// import onboardingReducer from './onboarding.reducer';
import generalReducer from './general.reducer';
import sseReducer from './sse.reducer';
import appReducer from './app.reducer';

const rootReducer = combineReducers({
    general: generalReducer,
    sse: sseReducer,
    app: appReducer
});

export default rootReducer;
