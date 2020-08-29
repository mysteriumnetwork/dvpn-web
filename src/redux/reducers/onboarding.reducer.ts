/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ONBOARDING_CREDENTIAL_AND_TERMS_CHECK, ONBOARDING_IDENTITIES_CHECK } from '../actionTypes/OnbordingTypes';
import { OnboardingState, OnboardingAction, CredentialsAndTermsChecks } from '../actions/onboarding/onboard.d';

const INITIAL_STATE: OnboardingState = {
    isDefaultCredentials: false,
    isDefaultCredentialsChecked: false,

    isTermsAgreementChecked: false,
    termsAgreedAt: undefined,
    termsAgreedVersion: undefined,

    isDefaultIdentityChecked: false,
    defaultRegisteredIdentity: undefined,
    isLoading: true,
};

function onboardingReducer(
    state = INITIAL_STATE,
    action: OnboardingAction<CredentialsAndTermsChecks>,
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
                isDefaultCredentialsChecked: isDefaultCredentialsChecked,
                isDefaultCredentials: isDefaultCredentials,
                isTermsAgreementChecked: isTermsAgreementChecked,
                termsAgreedAt: termsAgreedAt,
                termsAgreedVersion: termsAgreedVersion,
                isLoading: false,
            };
        }
        case ONBOARDING_IDENTITIES_CHECK: {
            // TODO implement
            return state;
        }
        default:
            return state;
    }
}

export default onboardingReducer;
