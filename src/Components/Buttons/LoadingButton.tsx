/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, MouseEventHandler } from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../../assets/styles/pages/onboarding/main.scss';
import '../../assets/styles/components/_buttons.scss';

interface Props {
    isLoading?: boolean;
    className?: string;
    children?: any;
    onClick?: MouseEventHandler;
}

const LoadingButton: FC<Props> = ({ isLoading, className, children, onClick }) => {
    if (isLoading) {
        return (
            <Button className={className || ''} disabled>
                <CircularProgress className="btn-spinner" />
            </Button>
        );
    }

    return (
        <Button onClick={onClick} className={className || ''}>
            {children}
        </Button>
    );
};

export default LoadingButton;
