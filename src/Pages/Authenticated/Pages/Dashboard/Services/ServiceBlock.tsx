/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { DefaultSwitch } from '../../../../../Components/DefaultSwitch';

interface PropsInterface {
    name: string;
    type: string;
    pricePerMinute: string;
    pricePerGb: string;
    whiteListed: boolean;
    turnedOn: boolean;
    openModal: (serviceType: string) => void;
}

const ServicesBlock: React.FC<PropsInterface> = (props) => {
    const [values, setValues] = React.useState({
        whitelisted: props.whiteListed,
        turnedOn: props.turnedOn,
    });
    const handleTurnedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, turnedOn: event.target.checked });
    };
    const handleWhitelistedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, whitelisted: event.target.checked });
    };

    return (
        <div className="services-blocks-row--block">
            <div className="header-row">
                <div className="logo-block">
                    <div className={props.turnedOn ? 'status-dot on' : 'status-dot off'}></div>
                </div>
                <div className="name-block">
                    <p className="name">{props.name}</p>
                    <p className="type">{props.type}</p>
                </div>
            </div>
            <div className="stats-row">
                <div className="service-stat text">
                    <div className="title">Price per minute</div>
                    <div className="text">{props.pricePerMinute}</div>
                </div>
                <div className="service-stat text">
                    <div className="title">Price per GB</div>
                    <div className="text">{props.pricePerGb}</div>
                </div>
                <div className="service-stat switch">
                    <div className="title">Whitelisted</div>
                    <DefaultSwitch
                        turnedOn={values.whitelisted}
                        handleChange={() => handleWhitelistedChange}
                        type="normal"
                    />
                </div>
                <div className="service-stat switch">
                    <div className="title">Turned on</div>
                    <DefaultSwitch turnedOn={values.turnedOn} handleChange={() => handleTurnedOnChange} type="normal" />
                </div>
            </div>
            <div className="control-row">
                <div className="button">Session history</div>
                <div onClick={() => props.openModal(props.name)} className="button">
                    Settings
                </div>
            </div>
        </div>
    );
};

export default ServicesBlock;
