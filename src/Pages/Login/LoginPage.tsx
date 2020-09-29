/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FormEvent } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { Alert, AlertTitle } from '@material-ui/lab';

import { updateAuthenticatedStore } from '../../redux/actions/app';
import { store } from '../../redux/store';
import sideImageOnboarding from '../../assets/images/onboarding/SideImage.png';
import '../../assets/styles/pages/login/main.scss';
import { DefaultTextField } from '../../Components/DefaultTextField';
import { DEFAULT_USERNAME } from '../../constants/defaults';
import Button from '../../Components/Buttons/Button';
import { loginAndStoreCurrentIdentity } from '../../api/TequilAPIWrapper';

interface StateProps {
    password: string;
    error: boolean;
    isLoading: boolean;
}

const LoginPage = () => {
    const [state, setState] = React.useState<StateProps>({
        password: '',
        error: false,
        isLoading: false,
    });

    const handleTextFieldsChange = (prop: keyof StateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleLogin = (e: FormEvent<any>) => {
        e.preventDefault();
        setState({ ...state, error: false, isLoading: true });
        loginAndStoreCurrentIdentity(DEFAULT_USERNAME, state.password)
            .then(() =>
                store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
            )
            .catch(() => setState({ ...state, error: true, isLoading: false }));
    };
    return (
        <div className="login wrapper">
            <div className="login-content">
                <div className="login-content-block">
                    <h1 className="login-content-block--heading">Welcome node runner!</h1>
                    <p className="login-content-block--heading-paragraph">Lets get you up and running. </p>
                    <div className="login-content-block--password-block">
                        <Collapse in={state.error}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                Bad credentials
                            </Alert>
                        </Collapse>
                        <form onSubmit={handleLogin}>
                            <div className="password-input-block">
                                <p className="text-field-label">Web UI password</p>
                                <DefaultTextField
                                    handleChange={handleTextFieldsChange}
                                    password={true}
                                    value={state.password}
                                    stateName="password"
                                />
                            </div>

                            <div className="password-actions-block">
                                <a href="#">Forgot password?</a>
                                <Button type="submit" isLoading={state.isLoading}>
                                    Sing In
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="side">
                <img alt="onboarding" src={sideImageOnboarding} />
            </div>
        </div>
    );
};

export default LoginPage;
