/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { Stats } from 'mysterium-vpn-js';

import secondsToISOTime from '../../../../../commons/secondsToISOTime';
import formatBytes, { add } from '../../../../../commons/formatBytes';
import { displayMyst } from '../../../../../commons/money.utils';

import StatCard from './TopStatBlock';

interface Props {
    stats?: Stats;
}

const Statistics: FC<Props> = ({ stats }) => {
    return (
        <>
            <StatCard stat={displayMyst(stats?.sumTokens)} name="Unsettled earnings" />
            <StatCard stat={secondsToISOTime(stats?.sumDuration || 0)} name="Sessions time" />
            <StatCard stat={formatBytes(add(stats?.sumBytesSent, stats?.sumBytesReceived))} name="Transferred" />
            <StatCard stat={'' + stats?.count} name="Sessions" />
            <StatCard stat={'' + stats?.countConsumers} name="Unique clients" />
        </>
    );
};

export default Statistics;
