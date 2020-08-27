import { combineReducers } from 'redux';
import onboardingReducer from './onboarding.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
    onboarding: onboardingReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;
