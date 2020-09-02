/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Stats } from 'mysterium-vpn-js';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { ReactComponent as Icon } from '../../../../assets/images/authenticated/pages/dashboard/graph-icon.svg';

import { sessionDailyStatsToGraphData } from './graph.utils';

interface PropsInterface {
    month: string;
    statsDaily: {
        [name: string]: Stats;
    };
}

const EarningGraphBlock: React.FC<PropsInterface> = ({ statsDaily }) => {
    const [values, setValues] = React.useState({
        active: 'earnings',
    });
    return (
        <div className="dashboard--earnings-graph">
            <div className="control-row">
                <div
                    className={values.active === 'earnings' ? 'control-btn active' : 'control-btn'}
                    onClick={() => setValues({ ...values, active: 'earnings' })}
                >
                    Earnings
                </div>
                <div
                    className={values.active === 'sessions' ? 'control-btn active' : 'control-btn'}
                    onClick={() => setValues({ ...values, active: 'sessions' })}
                >
                    Sessions
                </div>
                <div
                    className={values.active === 'data' ? 'control-btn active' : 'control-btn'}
                    onClick={() => setValues({ ...values, active: 'data' })}
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
                        data={sessionDailyStatsToGraphData(statsDaily)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="x" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="y"
                            stroke="#8884d8"
                            activeDot={{ stroke: '#C986AB', fill: '#9E1F63', strokeWidth: 5, r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningGraphBlock;
