import { combineReducers } from 'redux';
import onboardingReducer from './onboarding.reducer';
import authReducer from './auth.reducer';
import dashboardReducer from './dashboard.reducer';

const rootReducer = combineReducers({
  user: authReducer,
  onboarding: onboardingReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;