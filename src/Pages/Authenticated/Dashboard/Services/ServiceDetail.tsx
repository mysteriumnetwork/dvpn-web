/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import './ServiceDetail.scss';

interface Props {
    label: string;
    alignValueRight?: boolean
}

const ServiceDetail: FC<Props> = ({ label, alignValueRight, children }) => {
    const alignRightClass = alignValueRight ? 'service-detail__value--align-right' : ''

    return (
        <div className="service-detail">
            <div className="service-detail__label">{label}</div>
            <div className={`service-detail__value ${alignRightClass}`}>
                {children}
            </div>
        </div>
    );
};

export default ServiceDetail;
