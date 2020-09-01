/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'redux';

import { ONBOARDING_CREDENTIAL_AND_TERMS_CHECK } from '../../actionTypes/OnbordingTypes';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../Services/constants';
import { tequilapiClient } from '../../../api/TequilApiClient';

import { OnboardingState } from './onboard.d';

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
