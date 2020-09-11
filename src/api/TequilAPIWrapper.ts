/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as termsPackageJson from '@mysteriumnetwork/terms/package.json';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { ServiceType } from '../commons';

import { tequilapiClient } from './TequilApiClient';

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

export const setAccessPolicy = async (policyName?: string | null): Promise<Config> => {
    return await tequilapiClient.updateUserConfig({
        data: {
            'access-policy': {
                list: policyName,
            },
        },
    });
};

export const setTrafficShaping = async (enabled: boolean): Promise<Config> => {
    return await tequilapiClient.updateUserConfig({
        data: {
            shaper: {
                enabled: enabled,
            },
        },
    });
};

export const setServicePrice = async (
    pricePerMinute: number,
    pricePerGb: number,
    service: ServiceType
): Promise<Config> => {
    const configServiceName = service === ServiceType.OPENVPN ? 'openvpn' : 'wireguard';
    return await tequilapiClient.updateUserConfig({
        data: {
            [configServiceName]: {
                'price-minute': pricePerMinute,
                'price-gb': pricePerGb,
            },
        },
    });
};

export const setAllServicePrice = async (pricePerMinute: number | null, pricePerGb: number | null): Promise<Config> => {
    return await tequilapiClient.updateUserConfig({
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
    });
};
