/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import '../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss';

interface Props {
    country: string;
    status: boolean;
    id: string;
    time: string;
    data: string;
    value: string;
}

const SessionCard: React.FC<Props> = ({ country, status, id, time, data, value }) => {
    return (
        <div className="session-block">
            <div className="heading-row">
                <div className="title">{country}</div>
                <div className={status ? 'status success' : 'status failed'}>{status ? 'Ongoing' : ''}</div>
            </div>
            <div className="id">{id}</div>
            <div className="stats-row">
                <div className="stat">{time}</div>
                <div className="stat">{data}</div>
                <div className="stat">{value}</div>
            </div>
        </div>
    );
};

export default SessionCard;
