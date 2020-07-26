import {typedAction} from './user';
import {Dispatch, AnyAction} from 'redux';

type onboardingState = {
  onboarded: boolean;
};
const initialState: onboardingState = {onboarded: false};
export const onboard = () => {
  return typedAction('onboarding/ONBOARD', true);
};

type onboardingAction = ReturnType<typeof onboard>;

export function onboardingReducer(
  state = initialState,
  action: onboardingAction
): onboardingState {
  switch (action.type) {
    case 'onboarding/ONBOARD':
      return {...initialState, onboarded: action.payload};
    default:
      return state;
  }
}