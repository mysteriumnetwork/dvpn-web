/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

import { DefaultTextField } from '../../../Components/DefaultTextField';
import '../../../assets/styles/pages/onboarding/steps/node-settings.scss';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import { validatePassword } from '../../../Services/Onboarding/ValidatePassword';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../../Services/constants';
import { tequilapiClient } from '../../../api/TequilApiClient';

interface StateInterface {
    passwordRepeat: string;
    password: string;
    apiToken: string;
    checked: boolean;
    error: boolean;
    errorMessage: string;
}

const PasswordChange: FC<{ callbacks: OnboardingChildProps }> = ({ callbacks }) => {
    const [values, setValues] = React.useState<StateInterface>({
        passwordRepeat: '',
        password: '',
        apiToken: 'l3Q45qGFwKKBWJRKAVJN9J34lR3NNV0XeQJB4BnA',
        checked: false,
        error: false,
        errorMessage: '',
    });

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, checked: event.target.checked });
    };

    const handleSubmitPassword = () => {
        setValues({ ...values, error: false });
        const isPasswordValid = validatePassword(values.password, values.passwordRepeat);
        if (isPasswordValid.success) {
            tequilapiClient
                .authChangePassword(DEFAULT_USERNAME, DEFAULT_PASSWORD, values.password)
                .then(() => tequilapiClient.setMMNApiKey(values.apiToken))
                .then(() => callbacks.nextStep());
        } else {
            setValues({ ...values, error: true, errorMessage: isPasswordValid.errorMessage });
        }
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
                        handleCheckboxChange={() => handleCheckboxChange}
                        label="Claim this node in my.mysterium.network"
                    />
                </div>
                <div className="api-token-block">
                    <p className="text-field-label">
                        API Token (get it <a href="#">here</a>)
                    </p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        value={values.apiToken}
                        stateName="apiToken"
                    />
                </div>
                <div onClick={handleSubmitPassword} className="btn btn-filled btn-center next">
                    <span className="btn-text">Done</span>
                </div>
            </div>
        </div>
    );
};
export default PasswordChange;
