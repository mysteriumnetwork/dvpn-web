/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'react';

import { tequilapiClient } from '../api/TequilApiClient';
import { resolveTermsAgreement } from '../commons/terms';
import { DEFAULT_IDENTITY_PASSPHRASE } from '../constants/defaults';

import { acceptTerms, updateConfigStore, updateIdentityStore } from './app.slice';

export const updateTermsStoreAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const userConfig = await tequilapiClient.userConfig();
        const { at, version } = resolveTermsAgreement(userConfig.data);
        dispatch(
            acceptTerms({
                acceptedAt: at,
                acceptedVersion: version,
            })
        );
    };
};

export const fetchIdentityAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const identity = await tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((identityRef) => tequilapiClient.identity(identityRef.id));
        dispatch(updateIdentityStore(identity));
    };
};

export const fetchConfigAsync = (): ((dispatch: Dispatch<any>) => void) => {
    return async (dispatch) => {
        const config = await tequilapiClient.config();
        dispatch(updateConfigStore(config));
    };
};
