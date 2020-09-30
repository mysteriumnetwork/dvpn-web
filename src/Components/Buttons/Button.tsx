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
    outlined?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({ isLoading, outlined, className, children, onClick, type, disabled }: Props): JSX.Element => {
    let classNames = 'btn p-r-30 p-l-30 btn--center ' + className;

    if(outlined) {
        classNames += ' btn--outline'
    } else {
        classNames += ' btn--filled'
    }

    return (
        <button disabled={disabled} type={type} onClick={onClick} className={classNames}>
            {isLoading ? <CircularProgress className="btn-spinner" /> : children}
        </button>
    );
};

export default Button;
