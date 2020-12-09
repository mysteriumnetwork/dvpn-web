/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { TequilapiError } from 'mysterium-vpn-js';

import Button from '../../../../Components/Buttons/Button';
import Errors from '../../../../Components/Validation/Errors';
import { tequilapiClient } from '../../../../api/TequilApiClient';
import { TextField } from '../../../../Components/TextField';

interface StateInterface {
    apiKey: string;
    error: boolean;
    errorMessage: string;
}

interface Props {
    apiKey: string;
    mmnUrl: string;
}

const MMN = ({ apiKey, mmnUrl }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [values, setValues] = React.useState<StateInterface>({
        apiKey: '',
        error: false,
        errorMessage: '',
    });

    useEffect(() => {
        setValues({ ...values, apiKey: apiKey });
    }, [apiKey]);

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const getValidationMessage = (response: any): string => {
        return response.data?.errors['api_key'][0]?.message || 'Validation error';
    };

    const handleSubmitToken = () => {
        setValues({ ...values, error: false });

        tequilapiClient
            .setMMNApiKey(values.apiKey)
            .then(() => {
                setValues({ ...values, error: false, errorMessage: '' });
                enqueueSnackbar('MMN API key updated.', { variant: 'success' });
            })
            .catch((error: Error) => {
                if (error instanceof TequilapiError) {
                    const apiError = getValidationMessage(error._originalError.response);
                    setValues({ ...values, error: true, errorMessage: apiError });
                }
            });
    };

    const link = (
        <a href={`${mmnUrl}/user/profile`} target="_blank" rel="noopener noreferrer">
            Get it here
        </a>
    );
    return (
        <div>
            <Errors error={values.error} errorMessage={values.errorMessage} />

            <div className="input-group">
                <div className="input-group__label">API Key ({link})</div>
                <TextField
                    stateName={'apiKey'}
                    id={'api_key'}
                    handleChange={handleTextFieldsChange}
                    value={values.apiKey}
                />
            </div>
            <div className="footer__buttons m-t-40">
                <Button onClick={handleSubmitToken}>Save</Button>
            </div>
        </div>
    );
};

export default MMN;
