/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ONBOARD } from '../actionTypes/OnbordingTypes';
import { OnboardingState, OnboardingTypes } from '../actions/onboarding/onboard.d';

const INITIAL_STATE: OnboardingState = {
    isDefaultCredentials: false,
    isLoading: true,
};

function onboardingReducer(state = INITIAL_STATE, action: OnboardingTypes): OnboardingState {
    switch (action.type) {
        case ONBOARD: {
            return {
                ...state,
                isDefaultCredentials: action.payload,
                isLoading: false,
            };
        }
        default:
            return state;
    }
}

export default onboardingReducer;
