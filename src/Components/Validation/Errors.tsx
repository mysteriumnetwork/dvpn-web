/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

interface Props {
    error: boolean;
    errorMessage: string;
}

const Errors = ({ error, errorMessage }: Props) => {
    return (
        <Collapse in={error}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
        </Collapse>
    );
};

export default Errors;
