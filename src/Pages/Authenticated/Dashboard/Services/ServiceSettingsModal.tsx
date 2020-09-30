/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { Fade, Modal } from '@material-ui/core';
import { ServiceInfo } from 'mysterium-vpn-js';
import { tequilapi } from 'mysterium-vpn-js/lib/tequilapi-client-factory';
import { useSnackbar } from 'notistack';

import './ServiceSettingsModal.scss';

import Slider from '../../../../Components/Slider/Slider';
import { DefaultSwitch } from '../../../../Components/DefaultSwitch';
import { ServiceType } from '../../../../commons';
import Button from '../../../../Components/Buttons/Button';
import { setAccessPolicy, setServicePrice, setTrafficShaping } from '../../../../api/TequilAPIWrapper';
import { parseError } from '../../../../commons/error.utils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    serviceType: ServiceType;
    currentPricePerGb: number;
    currentPricePerMinute: number;
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

const ServiceSettingsModal = ({
    onClose,
    isOpen,
    serviceType,
    currentPricePerGb,
    currentPricePerMinute,
    isCurrentAccessPolicyEnabled,
    isCurrentTrafficShapingEnabled,
    serviceInfo,
    identityRef,
}: Props): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState<StateProps>({
        pricePerMinuteChosen: currentPricePerMinute,
        pricePerGbChosen: currentPricePerGb,
        isVerifiedTrafficEnabled: isCurrentAccessPolicyEnabled,
        isTrafficShapingEnabled: isCurrentTrafficShapingEnabled,
    });
    const { enqueueSnackbar } = useSnackbar();
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
                            <Slider
                                label="Price per minute"
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
                            <Slider
                                label="Price per GB"
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
                        <Button onClick={onClose} className="button">
                            Close
                        </Button>
                        <Button
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
                                    .catch((err) => {
                                        enqueueSnackbar(parseError(err), { variant: 'error' });
                                        console.log(err);
                                    })
                                    .finally(() => {
                                        setIsLoading(false);
                                    });
                            }}
                        >
                            Save & Restart
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default ServiceSettingsModal;
