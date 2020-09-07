/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Slider } from '@material-ui/core';

interface Props {
    value: number;
    handleChange: (event: React.ChangeEvent<any>, value: number) => void;
    step: number;
    min: number;
    max: number;
    disabled?: boolean;
    mystSlider?: boolean;
}

export const DefaultSlider: React.FC<Props> = ({ value, handleChange, step, min, max, disabled, mystSlider }) => {
    return (
        <Slider
            valueLabelDisplay="auto"
            step={step}
            min={min}
            max={max}
            onChange={(e, v) => {
                if (typeof v === 'number') {
                    handleChange(e, v);
                }
            }}
            value={value}
            className={mystSlider ? 'default-slider myst-slider' : 'default-slider '}
            disabled={disabled}
            valueLabelFormat={mystSlider ? (value) => <div>{value} MYST</div> : (value) => value}
        />
    );
};
