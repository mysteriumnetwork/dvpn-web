/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { SessionStats } from 'mysterium-vpn-js';

import secondsToISOTime from '../../../../commons/secondsToISOTime';
import formatBytes, { add } from '../../../../commons/formatBytes';
import { displayMyst } from '../../../../commons/money.utils';

import Statistic from './Statistic';

interface Props {
    stats?: SessionStats;
}

const Statistics: FC<Props> = ({ stats }) => {
    return (
        <>
            <Statistic stat={displayMyst(stats?.sumTokens)} name="Unsettled earnings" />
            <Statistic stat={secondsToISOTime(stats?.sumDuration || 0)} name="Sessions time" />
            <Statistic stat={formatBytes(add(stats?.sumBytesSent, stats?.sumBytesReceived))} name="Transferred" />
            <Statistic stat={'' + stats?.count} name="Sessions" />
            <Statistic stat={'' + stats?.countConsumers} name="Unique clients" />
        </>
    );
};

export default Statistics;
