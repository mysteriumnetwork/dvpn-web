/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config';
import _ from 'lodash';

export const mmnWebAddress = (c?: Config): string => {
    return _.get<Config, any>(c, 'data.mmn.web-address') || '#';
};
export const mmnDomainName = (c?: Config): string => {
    const address = _.get<Config, any>(c, 'data.mmn.web-address') || '#';

    const url = new URL(address);

    return url.hostname;
};
