/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

import { store } from '../../../redux/store';
import { updateAuthenticatedStore } from '../../../redux/actions/app';
import { DefaultTextField } from '../../../Components/DefaultTextField';
import '../../../assets/styles/pages/onboarding/steps/node-settings.scss';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import { validatePassword } from '../../../commons/ValidatePassword';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../../constants/defaults';
import { tequilapiClient } from '../../../api/TequilApiClient';
import Button from '../../../Components/Buttons/Button';
import { parseMessage } from '../../../commons/error.utils';

interface StateInterface {
    passwordRepeat: string;
    password: string;
    apiKey: string;
    checked: boolean;
    error: boolean;
    errorMessage: string;
    nodeClaimed: boolean;
}

const PasswordChange = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const [values, setValues] = React.useState<StateInterface>({
        passwordRepeat: '',
        password: '',
        apiKey: '',
        checked: false,
        error: false,
        errorMessage: '',
        nodeClaimed: false,
    });

    useEffect(() => {
        tequilapiClient.getMMNApiKey().then((resp) => {
            setValues({ ...values, apiKey: resp.api_key });
        });
    }, []);

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, checked: event.target.checked });
    };

    const handleSubmitPassword = async () => {
        setValues({ ...values, error: false });

        if (values.checked && !values.apiKey) {
            setValues({ ...values, error: true, errorMessage: 'Please enter MMN ApiKey' });
            return;
        }

        const isPasswordValid = validatePassword(values.password, values.passwordRepeat);
        if (!isPasswordValid.success) {
            setValues({ ...values, error: true, errorMessage: isPasswordValid.errorMessage });
            return;
        }

        (values.checked ? tequilapiClient.setMMNApiKey(values.apiKey) : Promise.resolve())
            .then(() => tequilapiClient.authChangePassword(DEFAULT_USERNAME, DEFAULT_PASSWORD, values.password))
            .then(() =>
                store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
            )
            .then(() => callbacks.nextStep())
            .catch((error) => {
                setValues({ ...values, error: true, errorMessage: parseMessage(error) || 'API Call failed.' });
                console.log(error);
            });
    };

    return (
        <div className="step-block node-settings">
            <h1 className="step-block--heading">Node settings</h1>
            <p className="step-block--heading-paragraph">Fill in the following information to setup your node.</p>
            <div className="step-block-content">
                <Collapse in={values.error}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {values.errorMessage}
                    </Alert>
                </Collapse>
                <div className="password-input-block">
                    <p className="text-field-label">Web UI password</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        password={true}
                        value={values.password}
                        stateName="password"
                    />
                </div>
                <div className="password-repeat-input-block">
                    <p className="text-field-label">Repeat password</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        password={true}
                        value={values.passwordRepeat}
                        stateName="passwordRepeat"
                    />
                </div>
                <div className="claim-node-block">
                    <DefaultCheckbox
                        checked={values.checked}
                        handleCheckboxChange={handleCheckboxChange}
                        label="Claim this node in my.mysterium.network"
                    />
                </div>
                <div className="api-token-block">
                    <p className="text-field-label">
                        API Token (get it <a href="https://my.mysterium.network/login">here</a>)
                    </p>
                    <DefaultTextField handleChange={handleTextFieldsChange} value={values.apiKey} stateName="apiKey" />
                </div>
                <Button onClick={handleSubmitPassword}>Done</Button>
            </div>
        </div>
    );
};
export default PasswordChange;
