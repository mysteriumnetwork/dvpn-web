import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { TequilapiError } from 'mysterium-vpn-js';
import Errors from '../../../../Components/Validation/Errors';

import { tequilapiClient } from '../../../../api/TequilApiClient';
import '../../../../assets/styles/pages/authenticated/pages/setings.scss';

import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface StateInterface {
    apiKey: string;
    error: boolean,
    errorMessage: string,
}

interface Props {
    apiKey: string
}

const MMN: React.FC<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [values, setValues] = React.useState<StateInterface>({
        apiKey: '',
        error: false,
        errorMessage: '',
    });

    useEffect(() => {
        setValues({ ...values, apiKey: props.apiKey });
    }, [props]);

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
        <a rel="noopener noreferrer"
           href="https://betanet.mysterium.network/user/profile"
           target={'_blank'}>here</a>
    )
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
            <button onClick={handleSubmitToken}
                    className="btn btn-filled btn-center identity">Save
            </button>
        </div>
    );
};

export default MMN;
