/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DECIMAL_PART_V3, Stats } from 'mysterium-vpn-js';

import { displayMyst } from '../../../commons/money.utils';
import { add } from '../../../commons/formatBytes';

export interface Pair {
    x: string;
    y: number | string;
}

export const sessionDailyStatsToEarningGraph = (statsDaily: { [name: string]: Stats }): Pair[] => {
    return Object.keys(statsDaily).map<Pair>((dateKey) => ({
        x: formatDate(dateKey),
        y: displayMyst(statsDaily[dateKey].sumTokens, { decimalPart: DECIMAL_PART_V3 }),
    }));
};

export const sessionDailyStatsToSessionsGraph = (statsDaily: { [name: string]: Stats }): Pair[] => {
    return Object.keys(statsDaily).map<Pair>((dateKey) => ({
        x: formatDate(dateKey),
        y: statsDaily[dateKey].count,
    }));
};

export const sessionDailyStatsToData = (statsDaily: { [name: string]: Stats }): Pair[] => {
    return Object.keys(statsDaily).map<Pair>((dateKey) => ({
        x: formatDate(dateKey),
        y: (add(statsDaily[dateKey].sumBytesReceived, statsDaily[dateKey].sumBytesSent) / (1024 * 1024 * 1024)).toFixed(
            2,
        ),
    }));
};

const formatDate = (malformed: string): string => {
    const year = malformed.substr(0, 4);
    const month = malformed.substr(4, 2);
    const day = malformed.substr(6, 2);
    return `${year}-${month}-${day}`;
};
