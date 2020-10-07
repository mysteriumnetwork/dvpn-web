/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import Slider from '../../../Components/Slider/Slider';
import { setAllServicePrice } from '../../../api/TequilAPIWrapper';
import { DEFAULT_PRICE_PER_MINUTE_PRICE, DEFAULT_PRICE_PER_GB } from '../../../constants/defaults';
import Button from '../../../Components/Buttons/Button';

interface StateInterface {
    checked: boolean;
    pricePerMinute: number;
    pricePerGb: number;
}

const PriceSettings = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const [state, setState] = React.useState<StateInterface>({
        checked: false,
        pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
        pricePerGb: DEFAULT_PRICE_PER_GB,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            checked: event.target.checked,
            pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
            pricePerGb: DEFAULT_PRICE_PER_GB,
        });
    };

    const handlePricePerMinuteChanged = (event: any, newValue: number) => {
        setState({
            ...state,
            pricePerMinute: newValue,
        });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setState({
            ...state,
            pricePerGb: newValue,
        });
    };

    const handleSettingSetup = () => {
        setAllServicePrice(state.pricePerMinute, state.pricePerGb).then(() => callbacks.nextStep());
    };

    return (
        <div className="step">
            <h1 className="step__title">Service price settings</h1>
            <p className="step__description">Fill in the following information to start running a VPN service.</p>
            <div className="step__content m-t-100">
                <div className="input-group m-t-10">
                    <Slider
                        myst={true}
                        label="Price per minute"
                        value={state.pricePerMinute}
                        handleChange={handlePricePerMinuteChanged}
                        step={0.001}
                        min={0}
                        max={0.01}
                        disabled={state.checked}
                    />
                </div>
                <div className="input-group m-t-40">
                    <Slider
                        myst={true}
                        label="Price per GB"
                        value={state.pricePerGb}
                        handleChange={handlePricePerGbChanged}
                        step={0.001}
                        min={0}
                        max={0.01}
                        disabled={state.checked}
                    />
                </div>
                <div className="input-group m-t-50 m-b-50">
                    <DefaultCheckbox
                        checked={state.checked}
                        handleCheckboxChange={handleCheckboxChange}
                        label="Use default pricing"
                    />
                </div>
                <div className="step__content-buttons step__content-buttons--center">
                    <Button onClick={handleSettingSetup}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default PriceSettings;
