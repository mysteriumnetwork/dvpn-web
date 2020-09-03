/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { ServiceInfo } from 'mysterium-vpn-js/src/provider/service-info';
import { tequilapi } from 'mysterium-vpn-js/lib/tequilapi-client-factory';
import { Switch } from '@material-ui/core';
import { ServiceStatus } from 'mysterium-vpn-js';

import { ServiceType } from '../../../../../commons';
import { DefaultSwitch } from '../../../../../Components/DefaultSwitch';
import displayMyst from '../../../../../commons/displayMyst';

interface Props {
    identityRef: string;
    servicesInfos?: ServiceInfo[];
}

const availableServices = [ServiceType.OPENVPN, ServiceType.WIREGUARD];

const findServiceInfo = (type: string, servicesInfos?: ServiceInfo[]): ServiceInfo | null => {
    if (!servicesInfos) {
        return null;
    }

    const results = servicesInfos.filter((s) => s.type.toLowerCase() === type);
    if (results.length != 1) {
        return null;
    }
    return results[0];
};

const Services: FC<Props> = ({ identityRef, servicesInfos }) => {
    const startService = (serviceType: string) => {
        tequilapi.serviceStart({
            providerId: identityRef,
            type: serviceType,
        });
    };

    const stopService = (serviceId: string) => {
        tequilapi.serviceStop(serviceId);
    };

    return (
        <>
            {availableServices.map((serviceType) => {
                const serviceInfo = findServiceInfo(serviceType.toLowerCase(), servicesInfos);
                const status = serviceInfo?.status || ServiceStatus.NOT_RUNNING;
                const { amount } = { ...serviceInfo?.proposal?.paymentMethod?.price };
                const { id } = { ...serviceInfo };
                return (
                    <div key={serviceType} className="services-blocks-row--block">
                        <div className="header-row">
                            <div className="logo-block">
                                <div
                                    className={status === ServiceStatus.RUNNING ? 'status-dot on' : 'status-dot off'}
                                />
                            </div>
                            <div className="name-block">
                                <p className="name">{serviceType}</p>
                                <p className="type">VPN</p>
                            </div>
                        </div>
                        <div className="stats-row">
                            <div className="service-stat text">
                                <div className="title">Price per minute</div>
                                <div className="text">{displayMyst(amount)}</div>
                            </div>
                            <div className="service-stat text">
                                <div className="title">Price per GB</div>
                                <div className="text">{displayMyst(amount)}</div>
                            </div>
                            <div className="service-stat switch">
                                <div className="title">Whitelisted</div>
                                <DefaultSwitch tunedOn={false} handleChange={() => {}} type="normal" />
                            </div>
                            <div className="service-stat switch">
                                <div className="title">Turned on</div>
                                <Switch
                                    checked={serviceInfo !== null}
                                    onChange={() => {
                                        if (!id) {
                                            startService(serviceType.toLowerCase());
                                        } else {
                                            stopService(id);
                                        }
                                    }}
                                    className={'default-switch '}
                                />
                            </div>
                        </div>
                        <div className="control-row">
                            <div className="button">Session history</div>
                            <div onClick={() => {}} className="button">
                                Settings
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Services;
