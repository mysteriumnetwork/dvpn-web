import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { onboardingReducer } from './modules/onboarding';
export const rootReducer = combineReducers({
  user: userReducer,
  onboarding: onboardingReducer,
});
export type RootState = ReturnType<typeof rootReducer>;