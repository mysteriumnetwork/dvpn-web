/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Stats } from 'mysterium-vpn-js';

import { MYST_DENOMINATOR } from '../../../../commons/formatCurrency';

export interface Pair {
    x: string;
    y: number;
}

export const sessionDailyStatsToGraphData = (statsDaily: { [name: string]: Stats }): Pair[] => {
    return Object.keys(statsDaily).map<Pair>((dateKey) => ({
        x: formatDate(dateKey),
        y: statsDaily[dateKey].sumTokens / MYST_DENOMINATOR,
    }));
};

const formatDate = (malformed: string): string => {
    const year = malformed.substr(0, 4);
    const month = malformed.substr(4, 2);
    const day = malformed.substr(6, 2);
    return `${year}-${month}-${day}`;
};
