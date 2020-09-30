/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
    password?: boolean;
    handleChange: Function;
    value: string;
    stateName: string;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
    defaultValue?: unknown;
    placeholder?: any;
    multiline?: boolean;
    rows?: number;
}

export const DefaultTextField = ({
    id,
    placeholder,
    password,
    handleChange,
    value,
    disabled,
    defaultValue,
    stateName,
    placeholder,
    multiline,
    rows = 1,
}: Props): JSX.Element => {
    return (
        <TextField
            id={id || 'field-' + stateName}
            type={password ? 'password' : 'text'}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange(stateName)}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={rows}
            className="default-text-field"
            multiline={multiline}
        />
    );
};
