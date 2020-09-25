/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Checkbox } from '@material-ui/core';

import { CustomUncheckedIcon } from './DefaultIcons/CustomIcons';

interface Props {
    checked: boolean;
    handleCheckboxChange: Function;
    label?: string;
}

export const DefaultCheckbox = ({ checked, handleCheckboxChange, label }: Props): JSX.Element => {
    return (
        <div className="checkbox-block">
            <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                color="primary"
                className="default-checkbox"
                icon={<CustomUncheckedIcon />}
            />
            <p>{label}</p>
        </div>
    );
};
