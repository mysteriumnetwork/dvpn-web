import {ONBOARD} from '../actionTypes/OnbordingTypes';
import {OnboardingState, OnboardingTypes} from '../actions/onboarding/onboard.d';

const INITIAL_STATE: OnboardingState = {
  onboarded: false
};

function onboardingReducer(state = INITIAL_STATE, action: OnboardingTypes): OnboardingState {
  switch (action.type) {
    case ONBOARD: {
      return {
        ...state,
        onboarded: action.payload,
      };
    }
    default:
      return state;
  }
}

export default onboardingReducer;