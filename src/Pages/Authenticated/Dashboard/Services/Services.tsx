/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { ServiceInfo } from 'mysterium-vpn-js/src/provider/service-info';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { ServiceType } from '../../../../commons';
import './Services.scss';

import ServiceCard from './ServiceCard';

interface Props {
    identityRef: string;
    servicesInfos?: ServiceInfo[];
    userConfig: Config;
    disabled?: boolean;
}

const availableServices = [ServiceType.OPENVPN, ServiceType.WIREGUARD];

const findServiceInfo = (type: string, servicesInfos?: ServiceInfo[]): ServiceInfo | undefined => {
    if (!servicesInfos) {
        return undefined;
    }

    const results = servicesInfos.filter((s) => s.type.toLowerCase() === type);
    if (results.length !== 1) {
        return undefined;
    }
    return results[0];
};

const Services = ({ identityRef, servicesInfos, userConfig, disabled }: Props) => {
    return (
        <>
            <div className="service-list">
                {availableServices.map((serviceType) => {
                    const serviceInfo = findServiceInfo(serviceType.toLowerCase(), servicesInfos);
                    return (
                        <ServiceCard
                            key={serviceType}
                            identityRef={identityRef}
                            serviceInfo={serviceInfo}
                            serviceType={serviceType}
                            config={userConfig}
                            disabled={disabled}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Services;
