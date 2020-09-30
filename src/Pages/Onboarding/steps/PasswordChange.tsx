/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import Errors from '../../../Components/Validation/Errors';

import { store } from '../../../redux/store';
import { updateAuthenticatedStore } from '../../../redux/actions/app';
import { DefaultTextField } from '../../../Components/DefaultTextField';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import { validatePassword } from '../../../commons/ValidatePassword';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../../constants/defaults';
import { tequilapiClient } from '../../../api/TequilApiClient';
import Button from '../../../Components/Buttons/Button';
import { parseError, parseMMNError } from '../../../commons/error.utils';
import { MMN_USER_PROFILE_URL } from '../../../constants/urls';

interface StateInterface {
    passwordRepeat: string;
    password: string;
    apiKey: string;
    checked: boolean;
    error: boolean;
    errorMessage: string;
    nodeClaimed: boolean;
}

const API_CALL_FAILED = 'API Call failed.';

const PasswordChange = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const [state, setState] = React.useState<StateInterface>({
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
            setState({ ...state, apiKey: resp.api_key });
        });
    }, []);

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, checked: event.target.checked });
    };

    const handleSubmitPassword = async () => {
        setState({ ...state, error: false });

        if (state.checked && !state.apiKey) {
            setState({ ...state, error: true, errorMessage: 'Please enter MMN ApiKey' });
            return;
        }

        const isPasswordValid = validatePassword(state.password, state.passwordRepeat);
        if (!isPasswordValid.success) {
            setState({ ...state, error: true, errorMessage: isPasswordValid.errorMessage });
            return;
        }

        (state.checked ? tequilapiClient.setMMNApiKey(state.apiKey) : Promise.resolve())
            .then(
                () => tequilapiClient.authChangePassword(DEFAULT_USERNAME, DEFAULT_PASSWORD, state.password),
                (mmnError) =>
                    setState({ ...state, error: true, errorMessage: parseMMNError(mmnError) || API_CALL_FAILED })
            )
            .then(() =>
                store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
            )
            .then(() => callbacks.nextStep())
            .catch((error) => {
                setState({ ...state, error: true, errorMessage: parseError(error) || API_CALL_FAILED });
                console.log(error);
            });
    };

    return (
        <div className="step">
            <h1 className="step__title">Node settings</h1>
            <p className="step__description">Fill in the following information to setup your node.</p>
            <div className="step__content m-t-100">
                <Errors error={state.error} errorMessage={state.errorMessage} />
                <div className="input-group">
                    <p className="input-group__label">Web UI password</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        password={true}
                        placeholder={"*********"}
                        value={state.password}
                        stateName="password"
                    />
                </div>
                <div className="input-group">
                    <p className="input-group__label">Repeat password</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        password={true}
                        placeholder={"*********"}
                        value={state.passwordRepeat}
                        stateName="passwordRepeat"
                    />
                </div>
                <div className="input-group m-t-50 m-b-20">
                    <DefaultCheckbox
                        checked={state.checked}
                        handleCheckboxChange={handleCheckboxChange}
                        label="Claim this node in my.mysterium.network"
                    />
                </div>
                {
                    state.checked ?
                    <div className="input-group m-t-20">
                        <p className="input-group__label">
                            API Token (
                            <a href={MMN_USER_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                                Get it here
                            </a>
                            )
                        </p>
                        <DefaultTextField
                            handleChange={handleTextFieldsChange}
                            value={state.apiKey}
                            placeholder={"Your API token"}
                            stateName="apiKey"
                        />
                    </div>
                    : null
                }
                <div className="step__content-buttons step__content-buttons--center m-t-30">
                    <Button onClick={handleSubmitPassword}>Save & Continue</Button>
                </div>
            </div>
        </div>
    );
};
export default PasswordChange;
