/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { Switch } from '@material-ui/core';

interface Props {
    turnedOn: boolean;
    handleChange: () => void;
    type: string;
}

export const DefaultSwitch: FC<Props> = ({ turnedOn, handleChange, type }) => {
    return <Switch checked={turnedOn} onChange={handleChange} className={'default-switch ' + type} />;
};
