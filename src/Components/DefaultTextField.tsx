/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { TextField } from '@material-ui/core';

interface PropsInterface {
    password?: boolean;
    handleChange: Function;
    value: string;
    stateName: string;
    disabled?: boolean;
    id?: string;
    defaultValue?: unknown;
}

export const DefaultTextField: React.FC<PropsInterface> = ({
    id,
    password,
    handleChange,
    value,
    disabled,
    defaultValue,
    stateName,
}) => {
    return (
        <TextField
            id={id || 'field-' + stateName}
            type={password ? 'password' : 'text'}
            disabled={disabled}
            onChange={handleChange(stateName)}
            value={value}
            defaultValue={defaultValue}
            className="default-text-field"
        />
    );
};
