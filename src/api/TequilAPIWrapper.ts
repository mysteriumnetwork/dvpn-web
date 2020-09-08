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
    const config = await tequilapiClient.userConfig();
    config.data.mysteriumWebUi = {
        termsAgreed: {
            version: termsPackageJson.version,
            at: new Date().toISOString(),
        },
    };
    return await tequilapiClient.updateUserConfig(config);
};

export const setAccessPolicy = async (policyName?: string): Promise<Config> => {
    const config = await tequilapiClient.userConfig();

    if (config?.data['access-policy']) {
        config.data['access-policy'].list = policyName;
    } else {
        config.data['access-policy'] = {
            list: policyName,
        };
    }

    return await tequilapiClient.updateUserConfig(config);
};

export const setServicePrice = async (
    pricePerMinute: number,
    pricePerGb: number,
    service: ServiceType
): Promise<Config> => {
    const configServiceName = service === ServiceType.OPENVPN ? 'openvpn' : 'wireguard';
    const config = await tequilapiClient.userConfig();

    if (config.data[configServiceName]) {
        config.data[configServiceName]['price-minute'] = pricePerMinute;
        config.data[configServiceName]['price-gb'] = pricePerGb;
    } else {
        config.data[configServiceName] = {
            'price-minute': pricePerMinute,
            'price-gb': pricePerGb,
        };
    }

    return await tequilapiClient.updateUserConfig(config);
};

export const setAllServicePrice = async (pricePerMinute: number | null, pricePerGb: number | null): Promise<Config> => {
    if (pricePerMinute === 0.005 && pricePerGb === 0.005) {
        pricePerMinute = null;
        pricePerGb = null;
    }
    const config = await tequilapiClient.userConfig();
    if (config.data.openvpn) {
        config.data.openvpn['price-minute'] = pricePerMinute;
        config.data.openvpn['price-gb'] = pricePerGb;
    } else {
        config.data.openvpn = {
            'price-minute': pricePerMinute,
            'price-gb': pricePerGb,
        };
    }
    if (config.data.wireguard) {
        config.data.wireguard['price-minute'] = pricePerMinute;
        config.data.wireguard['price-gb'] = pricePerGb;
    } else {
        config.data.wireguard = {
            'price-minute': pricePerMinute,
            'price-gb': pricePerGb,
        };
    }

    return await tequilapiClient.updateUserConfig(config);
};
