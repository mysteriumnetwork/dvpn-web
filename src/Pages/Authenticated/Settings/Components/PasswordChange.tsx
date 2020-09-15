import React from 'react';
import { useSnackbar } from 'notistack';
import { TequilapiError } from 'mysterium-vpn-js';
import Errors from '../../../../Components/Validation/Errors';

import { tequilapiClient } from '../../../../api/TequilApiClient';
import { validatePassword } from '../../../../commons/ValidatePassword';
import { DEFAULT_USERNAME } from '../../../../constants/defaults';
import '../../../../assets/styles/pages/authenticated/pages/setings.scss';

import { DefaultTextField } from '../../../../Components/DefaultTextField';

interface StateInterface {
    newPasswordConfirmation: string;
    newPassword: string;
    currentPassword: string;
    error: boolean,
    errorMessage: string,
}

const defaultState = {
    newPasswordConfirmation: '',
    newPassword: '',
    currentPassword: '',
    error: false,
    errorMessage: '',
};

const PasswordChange: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = React.useState<StateInterface>(defaultState);

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmitPassword = () => {
        setValues({ ...values, error: false });

        const isPasswordValid = validatePassword(values.newPassword, values.newPasswordConfirmation);
        if (!isPasswordValid.success) {
            setValues({ ...values, error: true, errorMessage: isPasswordValid.errorMessage });

            return;
        }

        tequilapiClient
            .authChangePassword(DEFAULT_USERNAME, values.currentPassword, values.newPassword)
            .then(() => {
                setValues(defaultState);
                enqueueSnackbar('Password changed.', { variant: 'success' });
            })
            .catch((error: Error) => {
                if (error instanceof TequilapiError) {
                    const apiError = error as TequilapiError;
                    setValues({ ...values, error: true, errorMessage: apiError.message });
                }
            });
    };

    return (
        <div>
            <Errors error={values.error} errorMessage={values.errorMessage} />

            <div className="password-input-block">
                <p className="text-field-label">Current password</p>
                <DefaultTextField
                    handleChange={handleTextFieldsChange}
                    password={true}
                    value={values.currentPassword}
                    stateName="currentPassword"
                />
            </div>
            <div className="password-input-block">
                <p className="text-field-label">New password</p>
                <DefaultTextField
                    handleChange={handleTextFieldsChange}
                    password={true}
                    value={values.newPassword}
                    stateName="newPassword"
                />
            </div>
            <div className="password-repeat-input-block">
                <p className="text-field-label">Repeat password</p>
                <DefaultTextField
                    handleChange={handleTextFieldsChange}
                    password={true}
                    value={values.newPasswordConfirmation}
                    stateName="newPasswordConfirmation"
                />
            </div>
            <button onClick={handleSubmitPassword}
                    className="btn btn-filled btn-center identity">Save
            </button>
        </div>
    );
};

export default PasswordChange;
