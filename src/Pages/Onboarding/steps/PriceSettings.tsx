/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import { DefaultSlider } from '../../../Components/DefaultSlider';
import '../../../assets/styles/pages/onboarding/steps/service-settings.scss';
import { setAllServicePrice } from '../../../api/TequilAPIWrapper';
import { DEFAULT_PRICE_PER_MINUTE_PRICE, DEFAULT_PRICE_PER_GB } from '../../../constants/defaults';
import Button from '../../../Components/Buttons/Button';

interface StateInterface {
    checked: boolean;
    pricePerMinute: number;
    pricePerGb: number;
}

const PriceSettings = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const [values, setValues] = React.useState<StateInterface>({
        checked: false,
        pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
        pricePerGb: DEFAULT_PRICE_PER_GB,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            checked: event.target.checked,
            pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
            pricePerGb: DEFAULT_PRICE_PER_GB,
        });
    };

    const handlePricePerMinuteChanged = (event: any, newValue: number) => {
        setValues({
            ...values,
            pricePerMinute: newValue,
        });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setValues({
            ...values,
            pricePerGb: newValue,
        });
    };

    const handleSettingSetup = () => {
        setAllServicePrice(values.pricePerMinute, values.pricePerGb).then(() => callbacks.nextStep());
    };

    return (
        <div className="step-block service-settings">
            <h1 className="step-block--heading">Service price settings</h1>
            <p className="step-block--heading-paragraph">
                Fill in the following information to start running a VPN service.
            </p>
            <div className="step-block-content">
                <div className="slider-block per-minute">
                    <p>Price per minute</p>
                    <DefaultSlider
                        value={values.pricePerMinute}
                        handleChange={handlePricePerMinuteChanged}
                        step={0.001}
                        min={0}
                        max={0.01}
                        disabled={values.checked}
                    />
                </div>
                <div className="slider-block per-gb">
                    <p>Price per GB</p>
                    <DefaultSlider
                        value={values.pricePerGb}
                        handleChange={handlePricePerGbChanged}
                        step={0.001}
                        min={0}
                        max={0.01}
                        disabled={values.checked}
                    />
                </div>
                <DefaultCheckbox
                    checked={values.checked}
                    handleCheckboxChange={() => handleCheckboxChange}
                    label="Use default pricing"
                />
                <Button onClick={handleSettingSetup}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PriceSettings;
