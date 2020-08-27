/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { ReactComponent as Icon } from '../../../../assets/images/authenticated/pages/dashboard/graph-icon.svg';

interface PropsInterface {
    month: string;
}

const EarningGraphBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
    // const props: PropsInterface = {..._props};
    const [values, setValues] = React.useState({
        active: 'earnings',
    });
    const data = [
        {
            name: '01',
            MYST: 4000,
        },
        {
            name: '02',
            MYST: 3000,
        },
        {
            name: '04',
            MYST: 2000,
        },
        {
            name: '05',
            MYST: 2780,
        },
        {
            name: '06',
            MYST: 1890,
        },
        {
            name: '07',
            MYST: 2390,
        },
        {
            name: '08',
            MYST: 5490,
        },
        {
            name: '09',
            MYST: 1490,
        },
        {
            name: '10',
            MYST: 6490,
        },
        {
            name: '11',
            MYST: 7490,
        },
        {
            name: '11',
            MYST: 7490,
        },
    ];
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
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="MYST"
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
