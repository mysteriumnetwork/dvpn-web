/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface PropsInterface {
    stat: string;
    name: string;
}

const DashboardTopStatsBlock: React.FC<PropsInterface> = (_props: PropsInterface) => {
    const props: PropsInterface = { ..._props };
    return (
        <div className="dashboard--top-stat">
            <p className="stat">{props.stat}</p>
            <p className="name">{props.name}</p>
        </div>
    );
};

export default DashboardTopStatsBlock;
