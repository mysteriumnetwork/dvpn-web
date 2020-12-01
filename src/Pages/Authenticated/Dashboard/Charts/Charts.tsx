/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { SessionStats } from 'mysterium-vpn-js';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';

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
                dataName: ' MYST',
            };
        case 'sessions':
            return {
                dataFunction: sessionDailyStatsToSessionsGraph,
                dataName: 'sessions',
            };
        case 'data':
            return {
                dataFunction: sessionDailyStatsToData,
                dataName: ' GB',
            };
    }
};

const Charts = ({ statsDaily }: Props) => {
    const [values, setValues] = useState<StateProps>({
        active: 'earnings',
        data: configByType('earnings').dataFunction,
        dataName: configByType('earnings').dataName,
    });

    const changeGraph = (active: ChartType) => {
        const config = configByType(active);
        setValues({ ...values, active: active, data: config.dataFunction, dataName: config.dataName });
    };

    let types = {
        earnings: {
            name: 'Earnings',
            ticks: [0, 5, 10],
        },
        sessions: {
            name: 'Sessions',
            ticks: [0, 5, 10],
        },
        data: {
            name: 'Data',
            ticks: [0, 2.5, 5],
        },
    };

    return (
        <div className="chart">
            <div className="chart__header">
                <div className="chart__header-title">Monthly report</div>
                <div className="chart__header-buttons">
                    {Object.keys(types).map((type) => {
                        return (
                            <div
                                key={type}
                                className={values.active === type ? 'control-btn active' : 'control-btn'}
                                onClick={() => changeGraph(type as ChartType)}
                            >
                                {
                                    // @ts-ignore
                                    types[type].name
                                }
                            </div>
                        );
                    })}
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
                            right: 50,
                            left: 25,
                            bottom: 30,
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 4" stroke="#eee" />
                        <XAxis dataKey="x" tickMargin={20} />
                        <YAxis
                            tick={{ width: 250 }}
                            tickMargin={10}
                            ticks={types[values.active].ticks}
                            dataKey="y"
                            unit={values.dataName}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="y"
                            name={values.dataName}
                            stroke="#8884d8"
                            activeDot={{ stroke: '#C986AB', fill: '#9e1f63', strokeWidth: 5, r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
