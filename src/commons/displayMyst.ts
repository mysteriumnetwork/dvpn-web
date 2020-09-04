/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Currency, displayMoney } from 'mysterium-vpn-js';

import { MONEY_DISPLAY_OPTIONS } from './index';

export default (amount?: number): string => {
    return displayMoney({ amount: amount || 0, currency: Currency.MYST }, MONEY_DISPLAY_OPTIONS);
};
