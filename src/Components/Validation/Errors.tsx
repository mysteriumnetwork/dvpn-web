import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

interface Props {
    error: boolean,
    errorMessage: string,
}

const Errors: React.FC<Props> = (props) => {
    return (
        <Collapse in={props.error}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {props.errorMessage}
            </Alert>
        </Collapse>
    );
};

export default Errors;
