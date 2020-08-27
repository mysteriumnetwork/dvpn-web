/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers } from 'redux';

import onboardingReducer from './onboarding.reducer';
import dashboardReducer from './dashboard.reducer';
import sseReducer from './sse.reducer';

const rootReducer = combineReducers({
    onboarding: onboardingReducer,
    dashboard: dashboardReducer,
    sse: sseReducer,
});

export default rootReducer;
