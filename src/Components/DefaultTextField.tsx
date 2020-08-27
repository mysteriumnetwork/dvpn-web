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
}

export const DefaultTextField: React.FC<PropsInterface> = (_props: PropsInterface) => {
    const props: PropsInterface = { ..._props };
    return (
        <TextField
            id="standard-basic"
            type={props.password ? 'password' : 'text'}
            onChange={props.handleChange(props.stateName)}
            value={props.value}
            className="default-text-field"
        />
    );
};
