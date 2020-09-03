/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

interface Props {
    stat: string;
    name: string;
}

const StatCard: React.FC<Props> = ({ stat, name }) => {
    return (
        <div className="dashboard--top-stat">
            <p className="stat">{stat}</p>
            <p className="name">{name}</p>
        </div>
    );
};

export default StatCard;
