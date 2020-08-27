/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Checkbox } from '@material-ui/core';

import { CustomUncheckedIcon } from './DefaultIcons/CustomIcons';

interface PropsInterface {
    checked: boolean;
    handleCheckboxChange: Function;
    label?: string;
}

export const DefaultCheckbox: React.FC<PropsInterface> = (_props: PropsInterface) => {
    const props: PropsInterface = { ..._props };
    return (
        <div className="checkbox-block">
            <Checkbox
                checked={props.checked}
                onChange={props.handleCheckboxChange()}
                color="primary"
                className="default-checkbox"
                icon={<CustomUncheckedIcon />}
            />
            <p>{props.label}</p>
        </div>
    );
};
