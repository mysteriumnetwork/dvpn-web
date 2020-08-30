/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Action } from 'redux';

export interface OnboardingState {
    isDefaultCredentials: boolean;
    isDefaultCredentialsChecked: boolean;

    isTermsAgreementChecked: boolean;
    termsAgreedAt?: string;
    termsAgreedVersion?: string;
}

export interface OnboardingAction<T> extends Action<string> {
    payload: T;
}

export interface CredentialsAndTermsChecks {
    isDefaultCredentials: boolean;
    isDefaultCredentialsChecked: boolean;
    isTermsAgreementChecked: boolean;
    termsAgreedAt?: string;
    termsAgreedVersion?: string;
}
