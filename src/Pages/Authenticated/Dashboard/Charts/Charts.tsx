/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { SessionStats } from 'mysterium-vpn-js';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

import { ReactComponent as Icon } from '../../../../assets/images/authenticated/pages/dashboard/graph-icon.svg';

import {
    Pair,
    sessionDailyStatsToData,
    sessionDailyStatsToEarningGraph,
    sessionDailyStatsToSessionsGraph,
} from './chart.utils';
import './Charts.scss';

interface Props {
    statsDaily: {
        [date: string]: SessionStats;
    };
}

type ChartType = 'earnings' | 'sessions' | 'data';

interface StateProps {
    active: ChartType;
    data: (arg: { [p: string]: SessionStats }) => Pair[];
    dataName: string;
}

interface Config {
    dataFunction: (arg: { [p: string]: SessionStats }) => Pair[];
    dataName: string;
}

const configByType = (type: ChartType): Config => {
    switch (type) {
        case 'earnings':
            return {
                dataFunction: sessionDailyStatsToEarningGraph,
                dataName: 'MYST',
            };
        case 'sessions':
            return {
                dataFunction: sessionDailyStatsToSessionsGraph,
                dataName: 'Count',
            };
        case 'data':
            return {
                dataFunction: sessionDailyStatsToData,
                dataName: 'Gb',
            };
    }
};

const Charts: React.FC<Props> = ({ statsDaily }) => {
    const [values, setValues] = React.useState<StateProps>({
        active: 'earnings',
        data: configByType('earnings').dataFunction,
        dataName: configByType('earnings').dataName,
    });

    const changeGraph = (active: ChartType) => {
        const config = configByType(active);
        setValues({ ...values, active: active, data: config.dataFunction, dataName: config.dataName });
    };

    return (
        <div className="dashboard--earnings-graph">
            <div className="control-row">
                <div
                    className={values.active === 'earnings' ? 'control-btn active' : 'control-btn'}
                    onClick={() => changeGraph('earnings')}
                >
                    Earnings
                </div>
                <div
                    className={values.active === 'sessions' ? 'control-btn active' : 'control-btn'}
                    onClick={() => changeGraph('sessions')}
                >
                    Sessions
                </div>
                <div
                    className={values.active === 'data' ? 'control-btn active' : 'control-btn'}
                    onClick={() => changeGraph('data')}
                >
                    Data
                </div>
                <div className="more-btn">
                    <Icon />
                </div>
            </div>
            <div className="graph-block">
                <ResponsiveContainer width="100%" maxHeight={320} aspect={4.0 / 3.0}>
                    <LineChart
                        width={500}
                        height={300}
                        data={values.data(statsDaily)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
                        <XAxis dataKey="x" />
                        <YAxis dataKey="y" unit={values.dataName} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="y"
                            name={values.dataName}
                            stroke="#8884d8"
                            activeDot={{ stroke: '#C986AB', fill: '#9E1F63', strokeWidth: 5, r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
