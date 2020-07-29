import { combineReducers } from 'redux';
import onboardingReducer from './onboarding';
import autentificateReducer from './autentifcate';

const rootReducer = combineReducers({
  user: autentificateReducer,
  onboarding: onboardingReducer
});

export default rootReducer;