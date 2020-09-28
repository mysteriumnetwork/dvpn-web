/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { ServiceInfo, ServiceStatus } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { useSnackbar } from 'notistack';
import _ from 'lodash';

import { ServiceType } from '../../../../commons';
import { DefaultSwitch } from '../../../../Components/DefaultSwitch';
import Button from '../../../../Components/Buttons/Button';
import { tequilapiClient } from '../../../../api/TequilApiClient';
import { parseMessage } from '../../../../commons/error.utils';

import ServiceHeader from './ServiceHeader';
import ServiceDetail from './ServiceDetail';
import ServiceSettingsModal from './ServiceSettingsModal';

const { RUNNING } = ServiceStatus;

interface Props {
    identityRef: string;
    serviceType: ServiceType;
    serviceInfo?: ServiceInfo;
    userConfig: Config;
}

interface ModalProps {
    isOpen: boolean;
}

const isTrafficShapingEnabled = (c: Config): boolean => {
    return _.get<Config, any>(c, 'data.shaper.enabled');
};

const isAccessPolicyEnabled = (c: Config): boolean => {
    return _.get<Config, any>(c, 'data.access-policy.list');
};

const pricePerGb = (c: Config, s: ServiceType): number => {
    return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-gb`) || 0;
};

const pricePerMin = (c: Config, s: ServiceType): number => {
    return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-minute`) || 0;
};

const ServiceCard = ({ serviceType, serviceInfo, identityRef, userConfig }: Props) => {
    const [isTurnOnWorking, setTurnOnWorking] = useState<boolean>(false);
    const [modalState, setModalState] = useState<ModalProps>({ isOpen: false });
    const { status, id } = { ...serviceInfo };
    const { enqueueSnackbar } = useSnackbar();

    const startService = (serviceType: string) => {
        setTurnOnWorking(true);
        tequilapiClient
            .serviceStart({
                providerId: identityRef,
                type: serviceType,
            })
            .catch((err) => {
                enqueueSnackbar(parseMessage(err) || `Service "${serviceType}" could not be started`, {
                    variant: 'error',
                });
                console.log(err);
            })
            .finally(() => setTurnOnWorking(false));
    };

    const stopService = (serviceId: string) => {
        setTurnOnWorking(true);
        tequilapiClient
            .serviceStop(serviceId)
            .catch((err) => {
                enqueueSnackbar(parseMessage(err) || `Service "${serviceType}" could not be stopped`, {
                    variant: 'error',
                });
                console.log(err);
            })
            .finally(() => setTurnOnWorking(false));
    };

    const openSettings = () => {
        setModalState({ ...modalState, isOpen: true });
    };

    const closeSettings = () => {
        setModalState({ ...modalState, isOpen: false });
    };

    const prices: {
        pricePerMin: number;
        pricePerGb: number;
    } = {
        pricePerMin: pricePerMin(userConfig, serviceType),
        pricePerGb: pricePerGb(userConfig, serviceType),
    };

    return (
        <div className="service">
            <ServiceHeader running={status === RUNNING} type={serviceType} />

            <div className="service__details">
                <ServiceDetail label="Price per minute">{prices.pricePerMin}</ServiceDetail>

                <ServiceDetail label="Price per GB">{prices.pricePerGb}</ServiceDetail>

                <ServiceDetail label="Turned on" alignValueRight={true}>
                    <DefaultSwitch
                        disabled={isTurnOnWorking}
                        turnedOn={!!serviceInfo}
                        handleChange={() => {
                            if (!id) {
                                startService(serviceType.toLowerCase());
                            } else {
                                stopService(id);
                            }
                        }}
                    />
                </ServiceDetail>
            </div>

            <div className="service__options">
                <Button onClick={openSettings} className="button">
                    Settings
                </Button>
            </div>

            <ServiceSettingsModal
                isOpen={modalState.isOpen}
                onClose={closeSettings}
                serviceType={serviceType}
                currentPricePerGb={prices.pricePerGb}
                currentPricePerMinute={prices.pricePerMin}
                identityRef={identityRef}
                serviceInfo={serviceInfo}
                isCurrentTrafficShapingEnabled={isTrafficShapingEnabled(userConfig)}
                isCurrentAccessPolicyEnabled={isAccessPolicyEnabled(userConfig)}
            />
        </div>
    );
};

export default ServiceCard;
