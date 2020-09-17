/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';

import './Bubble.scss';

interface Props {
    type?: string;
}

const Bubble: FC<Props> = ({ type }) => {
    return (
        <div className={`bubble bubble--${type}`} />
    );
};

export default Bubble;
