/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json';
import { TequilapiError } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { ServiceType } from '../commons';
import { store } from '../redux/store';
import { DEFAULT_IDENTITY_PASSPHRASE, DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../constants/defaults';
import { updateConfigStore, updateIdentityStore } from '../redux/app.slice';

import { tequilapiClient } from './TequilApiClient';

export const loginAndStoreCurrentIdentity = async (username: string, password: string): Promise<void> => {
    return await tequilapiClient
        .authLogin(username, password)
        .then(() => tequilapiClient.identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE }))
        .then((identityRef) => tequilapiClient.identity(identityRef.id))
        .then((identity) => {
            store.dispatch(updateIdentityStore(identity));
            return Promise.resolve();
        });
};

export const loginWithDefaultCredentials = async (): Promise<boolean> => {
    try {
        await tequilapiClient.authLogin(DEFAULT_USERNAME, DEFAULT_PASSWORD);

        return true;
    } catch (e) {
        if (e instanceof TequilapiError && e.isUnauthorizedError) {
            return false;
        }
    }

    return false;
};

export const isUserAuthenticated = async (): Promise<boolean> => {
    try {
        await tequilapiClient.healthCheck();
    } catch (e) {
        if (e instanceof TequilapiError && e.isUnauthorizedError) {
            return false;
        }
    }

    return true;
};

export const acceptWithTermsAndConditions = async (): Promise<Config> => {
    return await tequilapiClient.updateUserConfig({
        data: {
            mysteriumWebUi: {
                termsAgreed: {
                    version: termsPackageJson.version,
                    at: new Date().toISOString(),
                },
            },
        },
    });
};

const updateConfig = async (): Promise<Config> => {
    return await tequilapiClient.config().then((config) => {
        store.dispatch(updateConfigStore(config));
        return config;
    });
};

export const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
    return await tequilapiClient
        .updateUserConfig({
            data: {
                'access-policy': {
                    list: policyName,
                },
            },
        })
        .then(updateConfig);
};

export const setTrafficShaping = async (enabled: boolean): Promise<Config> => {
    return await tequilapiClient
        .updateUserConfig({
            data: {
                shaper: {
                    enabled: enabled,
                },
            },
        })
        .then(updateConfig);
};

export const setServicePrice = async (
    pricePerMinute: number,
    pricePerGb: number,
    service: ServiceType
): Promise<Config> => {
    const configServiceName = service === ServiceType.OPENVPN ? 'openvpn' : 'wireguard';
    return await tequilapiClient
        .updateUserConfig({
            data: {
                [configServiceName]: {
                    'price-minute': pricePerMinute,
                    'price-gb': pricePerGb,
                },
            },
        })
        .then(updateConfig);
};

export const setAllServicePrice = async (pricePerMinute: number | null, pricePerGb: number | null): Promise<Config> => {
    return await tequilapiClient
        .updateUserConfig({
            data: {
                openvpn: {
                    'price-minute': pricePerMinute,
                    'price-gb': pricePerGb,
                },
                wireguard: {
                    'price-minute': pricePerMinute,
                    'price-gb': pricePerGb,
                },
            },
        })
        .then(updateConfig);
};
