import { combineReducers } from 'redux';
import onboardingReducer from './onboarding';

const rootReducer = combineReducers({
  onboarding: onboardingReducer
});

export default rootReducer;