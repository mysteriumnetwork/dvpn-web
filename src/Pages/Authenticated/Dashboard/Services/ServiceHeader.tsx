/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { ReactComponent as OpenVpnIcon } from '../../../../assets/images/ovpn-icon.svg';
import { ReactComponent as WireGuardIcon } from '../../../../assets/images/wg-icon.svg';
import { ServiceType } from '../../../../commons';
import "./ServiceHeader.scss";

const icons = {
    [ServiceType.OPENVPN]: <OpenVpnIcon />,
    [ServiceType.WIREGUARD]: <WireGuardIcon />,
};

interface Props {
    type: ServiceType;
    running: boolean;
}

const ServiceHeader: FC<Props> = ({ type, running }) => {
    return (
        <div className="service-header">
            <div className="service-header__logo">
                {icons[type]}
                <div className={running ? 'status-dot on' : 'status-dot off'} />
            </div>
            <div className="service-header__name">
                <p className="name">{type}</p>
                <p className="type">VPN</p>
            </div>
        </div>
    );
};

export default ServiceHeader;
