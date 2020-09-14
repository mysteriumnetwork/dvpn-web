/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch, Action } from 'redux';

import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../constants/defaults';
import { tequilapiClient } from '../../api/TequilApiClient';

export const ONBOARDING_CREDENTIAL_AND_TERMS_CHECK = 'CREDENTIAL_AND_TERMS_CHECK';

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

interface Agreement {
    at?: string;
    version?: string;
}

const resolveTermsAgreement = (configData?: any): Agreement => {
    return configData?.mysteriumwebui?.termsAgreed || {};
};

export const checkCredentialsAndTerms = (): ((dispatch: Dispatch) => void) => {
    return async (dispatch: Dispatch) => {
        const payload: OnboardingState = {
            isDefaultCredentials: false,
            isDefaultCredentialsChecked: false,

            isTermsAgreementChecked: false,
            termsAgreedAt: undefined,
            termsAgreedVersion: undefined,
        };

        await tequilapiClient
            .authLogin(DEFAULT_USERNAME, DEFAULT_PASSWORD)
            .then(() => {
                payload.isDefaultCredentialsChecked = true;
                payload.isDefaultCredentials = true;
            })
            .catch(() => {
                payload.isDefaultCredentialsChecked = true;
            });

        if (payload.isDefaultCredentials) {
            const userConfig = await tequilapiClient.userConfig();
            const { at, version } = resolveTermsAgreement(userConfig.data);
            payload.isTermsAgreementChecked = true;
            payload.termsAgreedAt = at;
            payload.termsAgreedVersion = version;
        }

        dispatch({
            payload: payload, // if login fails with default credentials, user is considered boarded
            type: ONBOARDING_CREDENTIAL_AND_TERMS_CHECK,
        });
    };
};
