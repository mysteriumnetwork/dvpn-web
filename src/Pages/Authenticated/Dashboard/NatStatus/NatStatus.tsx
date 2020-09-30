/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { NAT_FIX_URL } from '../../../../constants/urls';

import Bubble from './Bubble';
import { statusColor, statusText } from './nat-status.utils';
import './NatStatus.scss';

interface Props {
    status: string;
}

const NatStatus = ({ status }: Props) => {
    const color = statusColor(status);
    return (
        <div className="nat-status">
            <Bubble type={color} />
            <div className="nat-status__label">NAT status</div>
            <div className={'nat-status__state nat-status__state--' + color}>{statusText(status)}</div>
            <div className="nat-status__help">
                {status !== 'successful' && (
                    <a href={NAT_FIX_URL} target="_blank" rel="noopener noreferrer">
                        How to fix this?
                    </a>
                )}
            </div>
        </div>
    );
};

export default NatStatus;
