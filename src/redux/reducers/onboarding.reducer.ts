/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ONBOARDING_CREDENTIAL_AND_TERMS_CHECK } from '../actions/onboard';
import { CredentialsAndTermsChecks, OnboardingAction, OnboardingState } from '../actions/onboard';
import isTermsAgreed from '../../commons/isTermsAgreed';

const INITIAL_STATE: OnboardingState = {
    isCheckPending: true,
    isNeedsOnboarding: false,

    isDefaultCredentials: false,
    isDefaultCredentialsChecked: false,

    isTermsAgreementChecked: false,
    termsAgreedAt: undefined,
    termsAgreedVersion: undefined,
};

const isNeedsOnboarding = (state: CredentialsAndTermsChecks): boolean => {
    if (!state.isDefaultCredentials) {
        return false;
    }
    return state.isDefaultCredentials || !isTermsAgreed(state.termsAgreedAt, state.termsAgreedVersion);
};

function onboardingReducer(
    state = INITIAL_STATE,
    action: OnboardingAction<CredentialsAndTermsChecks>
): OnboardingState {
    switch (action.type) {
        case ONBOARDING_CREDENTIAL_AND_TERMS_CHECK: {
            const {
                isDefaultCredentialsChecked,
                isDefaultCredentials,
                isTermsAgreementChecked,
                termsAgreedAt,
                termsAgreedVersion,
            } = action.payload;
            return {
                ...state,
                isCheckPending: false,
                isNeedsOnboarding: isNeedsOnboarding(action.payload),
                isDefaultCredentialsChecked: isDefaultCredentialsChecked,
                isDefaultCredentials: isDefaultCredentials,
                isTermsAgreementChecked: isTermsAgreementChecked,
                termsAgreedAt: termsAgreedAt,
                termsAgreedVersion: termsAgreedVersion,
            };
        }
        default:
            return state;
    }
}

export default onboardingReducer;
