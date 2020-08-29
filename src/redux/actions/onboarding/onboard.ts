/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'redux';

import { ONBOARDING_CREDENTIAL_AND_TERMS_CHECK } from '../../actionTypes/OnbordingTypes';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../Services/constants';
import { authLogin } from '../../../api/TequilaApiCalls';
import { tequilapiClient } from '../../../api/TequilApiClient';

interface Agreement {
    at?: string;
    version?: string;
}

const resolveTermsAgreement = (configData?: any): Agreement => {
    return configData?.mysteriumwebui?.termsAgreed || {};
};

export const checkCredentialsAndTerms = (): ((dispatch: Dispatch) => void) => {
    return async (dispatch: Dispatch) => {
        const authResponse = await authLogin({ username: DEFAULT_USERNAME, password: DEFAULT_PASSWORD });
        const userConfig = await tequilapiClient.userConfig();
        const { at, version } = resolveTermsAgreement(userConfig.data);
        dispatch({
            payload: {
                isDefaultCredentials: true,
                isDefaultCredentialsChecked: authResponse.success,
                isTermsAgreementChecked: true,
                termsAgreedAt: at,
                termsAgreedVersion: version,
            }, // if login fails with default credentials, user is considered boarded
            type: ONBOARDING_CREDENTIAL_AND_TERMS_CHECK,
        });
    };
};
