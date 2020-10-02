/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { MouseEventHandler } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Button.scss';

interface Props {
    isLoading?: boolean;
    className?: string;
    children?: any;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    style?: 'outline' | 'filled' | 'gray' | 'outline-primary';
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({ isLoading, style, className, children, onClick, type, disabled }: Props): JSX.Element => {
    const classNames = `btn p-r-30 p-l-30 ${className || ''} btn--${style || 'filled'}`;

    return (
        <button disabled={disabled} type={type} onClick={onClick} className={classNames}>
            {isLoading ? <CircularProgress className="loader" /> : children}
        </button>
    );
};

export default Button;
