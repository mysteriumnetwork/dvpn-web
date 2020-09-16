/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useState } from 'react';
import { Fade, Modal } from '@material-ui/core';
import { DECIMAL_PART_V3, Money, ServiceInfo } from 'mysterium-vpn-js';
import { tequilapi } from 'mysterium-vpn-js/lib/tequilapi-client-factory';
import { DefaultSlider } from '../../../../Components/DefaultSlider';
import { DefaultSwitch } from '../../../../Components/DefaultSwitch';
import { ServiceType } from '../../../../commons';
import LoadingButton from '../../../../Components/Buttons/LoadingButton';
import { setAccessPolicy, setServicePrice, setTrafficShaping } from '../../../../api/TequilAPIWrapper';

import "./ServiceSettingsModal.scss"

interface Props {
    isOpen: boolean;
    onClose: () => void;
    serviceType: ServiceType;
    currentPricePerGb: Money;
    currentPricePerMinute: Money;
    identityRef: string;
    serviceInfo?: ServiceInfo;
    isCurrentAccessPolicyEnabled: boolean;
    isCurrentTrafficShapingEnabled: boolean;
}

interface StateProps {
    pricePerGbChosen: number;
    pricePerMinuteChosen: number;
    isVerifiedTrafficEnabled: boolean;
    isTrafficShapingEnabled: boolean;
}

const myst2HumanReadable = (amount?: number): number => {
    const humanReadable = (amount || 0) / DECIMAL_PART_V3;
    return parseFloat(humanReadable.toFixed(3));
};

const ServiceSettingsModal: FC<Props> = ({
    onClose,
    isOpen,
    serviceType,
    currentPricePerGb,
    currentPricePerMinute,
    isCurrentAccessPolicyEnabled,
    isCurrentTrafficShapingEnabled,
    serviceInfo,
    identityRef,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState<StateProps>({
        pricePerMinuteChosen: myst2HumanReadable(currentPricePerMinute.amount),
        pricePerGbChosen: myst2HumanReadable(currentPricePerGb.amount),
        isVerifiedTrafficEnabled: isCurrentAccessPolicyEnabled,
        isTrafficShapingEnabled: isCurrentTrafficShapingEnabled,
    });

    return (
        <Modal
            className="settings-modal"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            disableAutoFocus={true}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className="settings-modal--block">
                    <div className="title">{serviceType} Settings</div>
                    <div className="settings-row">
                        <div className="settings-row--slider">
                            <p>Price per minute</p>
                            <DefaultSlider
                                value={state.pricePerMinuteChosen}
                                handleChange={(e, v) => {
                                    setState({ ...state, pricePerMinuteChosen: v });
                                }}
                                step={0.001}
                                min={0}
                                max={0.01}
                                disabled={false}
                            />
                            <div className="bottom-line">
                                <p>0 MYST</p>
                                <p>0.001 MYST</p>
                            </div>
                        </div>
                        <div className="settings-row--slider">
                            <p>Price per GB</p>
                            <DefaultSlider
                                value={state.pricePerGbChosen}
                                handleChange={(e, v) => {
                                    setState({ ...state, pricePerGbChosen: v });
                                }}
                                step={0.01}
                                min={0}
                                max={0.5}
                                disabled={false}
                            />
                            <div className="bottom-line">
                                <p>0 MYST</p>
                                <p>0.50 MYST</p>
                            </div>
                        </div>
                    </div>
                    <div className="partners-block">
                        <div className="switch-row">
                            <DefaultSwitch
                                disabled={false}
                                turnedOn={state.isVerifiedTrafficEnabled}
                                handleChange={(e, checked) => {
                                    setState({ ...state, isVerifiedTrafficEnabled: checked });
                                }}
                            />
                            <p className="text">Only Mysterium verified partner traffic</p>
                        </div>
                        <p className="under-text">
                            Safe option: traffic vetted via business contracts, unavailable to the general public and
                            limited to streaming. This option potentially will give less reward.
                        </p>
                    </div>
                    <div className="limits-block">
                        <DefaultSwitch
                            disabled={false}
                            turnedOn={state.isTrafficShapingEnabled}
                            handleChange={(e, checked) => {
                                setState({ ...state, isTrafficShapingEnabled: checked });
                            }}
                        />
                        <p className="text">Limit bandwidth to 5Mb/s</p>
                    </div>
                    <div className="buttons-block">
                        <LoadingButton onClick={onClose} className="button">
                            Close
                        </LoadingButton>
                        <LoadingButton
                            isLoading={isLoading}
                            onClick={() => {
                                setIsLoading(true);
                                setServicePrice(state.pricePerMinuteChosen, state.pricePerGbChosen, serviceType)
                                    .then(() => setAccessPolicy(state.isVerifiedTrafficEnabled ? 'mysterium' : null))
                                    .then(() => setTrafficShaping(state.isTrafficShapingEnabled))
                                    .then(() =>
                                        serviceInfo?.id ? tequilapi.serviceStop(serviceInfo.id) : Promise.resolve()
                                    )
                                    .then(() =>
                                        tequilapi.serviceStart({
                                            providerId: identityRef,
                                            type: serviceType.toLowerCase(),
                                        })
                                    )
                                    .then(() => onClose())
                                    .catch(() => { })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                            }}
                            className="btn btn-filled save"
                        >
                            <span className="btn-text-white">Save & Restart</span>
                        </LoadingButton>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default ServiceSettingsModal;
