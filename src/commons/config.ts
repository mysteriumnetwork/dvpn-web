/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash';
import { DECIMAL_PART } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { ServiceType } from './index';

export const isFreeRegistration = (c: Config): boolean => {
    return _.get<Config, any>(c, 'data.testnet2');
};

export const isTrafficShapingEnabled = (c: Config): boolean => {
    return _.get<Config, any>(c, 'data.shaper.enabled');
};

export const isAccessPolicyEnabled = (c: Config): boolean => {
    return _.get<Config, any>(c, 'data.access-policy.list');
};

export const servicePricePerGb = (c: Config, s: ServiceType): number => {
    return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-gb`) || 0;
};

export const servicePricePerMin = (c: Config, s: ServiceType): number => {
    return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-minute`) || 0;
};

export const defaultPricePerGb = (c: Config): number => {
    return _.get<Config, any>(c, `data.payment.price-gb`) || 0;
};

export const defaultPricePerMin = (c: Config): number => {
    return _.get<Config, any>(c, `data.payment.price-minute`) || 0;
};

export const pricePerGbMax = (c: Config): number => {
    const max = _.get<Config, any>(c, `data.payments.consumer.price-pergib-max`) || 0;

    return max / DECIMAL_PART;
};

export const pricePerMinMax = (c: Config): number => {
    const max = _.get<Config, any>(c, `data.payments.consumer.price-perminute-max`) || 0;

    return max / DECIMAL_PART;
};
