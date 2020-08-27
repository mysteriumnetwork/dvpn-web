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
