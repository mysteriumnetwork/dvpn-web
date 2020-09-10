/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';

import { natStatus, natStatusColor } from '../../../../commons/natStatus';
import '../../../../assets/styles/pages/authenticated/pages/dashboard.scss';

interface Props {
    status?: string;
}

const NatStatus: FC<Props> = ({ status }) => {
    const color = natStatusColor(status);
    return (
        <div>
            <div className={'status-circle inlined ' + color} />
            <p className="heading inlined info">NAT status</p>
            <p className={'status inlined failed ' + color}>{natStatus(status)}</p>
            {status !== 'successful' && (
                <a href="#" className="link">
                    How to fix this?
                </a>
            )}
        </div>
    );
};

export default NatStatus;
