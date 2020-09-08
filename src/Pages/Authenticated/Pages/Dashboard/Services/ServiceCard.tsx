/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FC, useState } from 'react';
import {
    DECIMAL_PART_V3,
    PaymentMethod,
    pricePerGiB,
    pricePerMinute,
    ServiceInfo,
    ServiceStatus,
} from 'mysterium-vpn-js';
import { tequilapi } from 'mysterium-vpn-js/lib/tequilapi-client-factory';
import { Config } from 'mysterium-vpn-js/lib/config/config';
import { useToasts } from 'react-toast-notifications';

import { ServiceType } from '../../../../../commons';
import { displayMoneyMyst, displayMyst } from '../../../../../commons/money.utils';
import { DefaultSwitch } from '../../../../../Components/DefaultSwitch';
import { ReactComponent as WireGuardIcon } from '../../../../../assets/images/wg-icon.svg';
import { ReactComponent as OpenVpnIcon } from '../../../../../assets/images/ovpn-icon.svg';
import LoadingButton from '../../../../../Components/Buttons/LoadingButton';

import ServiceSettingsModal from './ServiceSettingsModal';

const { RUNNING } = ServiceStatus;

interface Props {
    identityRef: string;
    serviceType: ServiceType;
    serviceInfo?: ServiceInfo;
    userConfig: Config;
}

const icons = {
    [ServiceType.OPENVPN]: <OpenVpnIcon />,
    [ServiceType.WIREGUARD]: <WireGuardIcon />,
};

const toMystMinute = (pm?: PaymentMethod): string => {
    return pm
        ? displayMoneyMyst(pricePerMinute(pm), {
              decimalPart: DECIMAL_PART_V3,
          })
        : displayMyst(0, { decimalPart: DECIMAL_PART_V3 });
};

const toMystGb = (pm?: PaymentMethod): string => {
    return pm
        ? displayMoneyMyst(pricePerGiB(pm), {
              decimalPart: DECIMAL_PART_V3,
          })
        : displayMyst(0, { decimalPart: DECIMAL_PART_V3 });
};

interface ModalProps {
    isOpen: boolean;
}

const isTrafficShapingEnabled = (config: Config): boolean => {
    return config?.data?.shaper?.enabled;
};

const isAccessPolicyEnabled = (config: Config): boolean => {
    return config?.data && config?.data['access-policy'] && config?.data['access-policy']?.list;
};

const ServiceCard: FC<Props> = ({ serviceType, serviceInfo, identityRef, userConfig }) => {
    const [isTurnOnWorking, setTurnOnWorking] = useState<boolean>(false);
    const [modalState, setModalState] = useState<ModalProps>({ isOpen: false });
    const { status, proposal, id } = { ...serviceInfo };
    const { addToast } = useToasts();

    const startService = (serviceType: string) => {
        setTurnOnWorking(true);
        tequilapi
            .serviceStart({
                providerId: identityRef,
                type: serviceType,
            })
            .catch(() =>
                addToast(`Service "${serviceType}" could not be started`, { appearance: 'error', autoDismiss: true })
            )
            .finally(() => setTurnOnWorking(false));
    };

    const stopService = (serviceId: string) => {
        setTurnOnWorking(true);
        tequilapi
            .serviceStop(serviceId)
            .catch(() =>
                addToast(`Service "${serviceType}" could not be stopped`, { appearance: 'error', autoDismiss: true })
            )
            .finally(() => setTurnOnWorking(false));
    };

    const openSettings = () => {
        setModalState({ ...modalState, isOpen: true });
    };

    const closeSettings = () => {
        setModalState({ ...modalState, isOpen: false });
    };

    return (
        <div className="services-blocks-row--block">
            <div className="header-row">
                <div className="logo-block">
                    {icons[serviceType]}
                    <div className={status === RUNNING ? 'status-dot on' : 'status-dot off'} />
                </div>
                <div className="name-block">
                    <p className="name">{serviceType}</p>
                    <p className="type">VPN</p>
                </div>
            </div>
            <div className="stats-row">
                <div className="service-stat text">
                    <div className="title">Price per minute</div>
                    <div className="text">{toMystMinute(proposal?.paymentMethod)}</div>
                </div>
                <div className="service-stat text">
                    <div className="title">Price per GB</div>
                    <div className="text">{toMystGb(proposal?.paymentMethod)}</div>
                </div>
                <div className="service-stat switch">
                    <div className="title">Whitelisted</div>
                    <DefaultSwitch disabled={false} turnedOn={false} handleChange={() => {}} />
                </div>
                <div className="service-stat switch">
                    <div className="title">Turned on</div>
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
                </div>
            </div>
            <div className="control-row">
                <div className="button">Session history</div>
                <LoadingButton onClick={openSettings} className="button">
                    Settings
                </LoadingButton>
            </div>
            <ServiceSettingsModal
                isOpen={modalState.isOpen}
                onClose={closeSettings}
                serviceType={serviceType}
                currentPricePerGb={pricePerGiB(proposal?.paymentMethod)}
                currentPricePerMinute={pricePerMinute(proposal?.paymentMethod)}
                identityRef={identityRef}
                serviceInfo={serviceInfo}
                isCurrentTrafficShapingEnabled={isTrafficShapingEnabled(userConfig)}
                isCurrentAccessPolicyEnabled={isAccessPolicyEnabled(userConfig)}
            />
        </div>
    );
};

export default ServiceCard;
