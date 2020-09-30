/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { MouseEventHandler } from 'react';
import { Button as MuiButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Button.scss';

interface Props {
    isLoading?: boolean;
    className?: string;
    children?: any;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const defaultClassName = 'btn p-r-15 p-l-15 btn--filled btn--center';

const Button = ({ isLoading, className, children, onClick, type, disabled }: Props): JSX.Element => {
    const compositeClassName = className ? `${defaultClassName} ${className}` : defaultClassName;

    return (
        <MuiButton disabled={disabled || isLoading} type={type} onClick={onClick} className={compositeClassName}>
            {isLoading ? <CircularProgress className="btn-spinner" /> : children}
        </MuiButton>
    );
};

export default Button;
