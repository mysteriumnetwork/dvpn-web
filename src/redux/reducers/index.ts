import { combineReducers } from 'redux';
import onboardingReducer from './onboarding';
import autentificateReducer from './autentifcate';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  user: autentificateReducer,
  onboarding: onboardingReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;