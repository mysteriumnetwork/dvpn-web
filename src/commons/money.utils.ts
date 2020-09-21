/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Currency, displayMoney, DisplayMoneyOptions, Money } from 'mysterium-vpn-js';

import { DEFAULT_MONEY_DISPLAY_OPTIONS } from './index';

/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const displayUsd = (amount?: number): string => {
    return '$' + (amount || 0);
};

export const displayMyst = (amount?: number, opts: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS): string => {
    return displayMoney({ amount: amount || 0, currency: Currency.MYST }, opts);
};

export const displayMoneyMyst = (money?: Money, opts: DisplayMoneyOptions = DEFAULT_MONEY_DISPLAY_OPTIONS): string => {
    return displayMoney(money || { amount: 0, currency: Currency.MYST }, opts);
};
