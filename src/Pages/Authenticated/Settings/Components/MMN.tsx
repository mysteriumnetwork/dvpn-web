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
import '../../../../assets/styles/pages/authenticated/pages/setings.scss';
import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface StateInterface {
    apiKey: string;
    error: boolean;
    errorMessage: string;
}

interface Props {
    apiKey: string;
}

const MMN = ({ apiKey }: Props) => {
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
        <a rel="noopener noreferrer" href="https://betanet.mysterium.network/user/profile" target={'_blank'}>
            here
        </a>
    );
    return (
        <div>
            <Errors error={values.error} errorMessage={values.errorMessage} />

            <p className="text-field-label">API Key (get it {link})</p>
            <DefaultTextField
                stateName={'apiKey'}
                id={'api_key'}
                handleChange={handleTextFieldsChange}
                value={values.apiKey}
            />
            <div className="m-t-15">
                <Button onClick={handleSubmitToken}>Save</Button>
            </div>
        </div>
    );
};

export default MMN;
