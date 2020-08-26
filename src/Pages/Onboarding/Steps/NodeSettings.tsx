import React from 'react';
import { ONBOARDING_PAYOUT_SETTINGS } from '../../../constants/routes';
import { DefaultTextField } from '../../../Components/DefaultTextField';
import '../../../assets/styles/pages/onboarding/steps/node-settings.scss';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';
import { authChangePassword, claimMMNNode } from '../../../api/TequilaApiCalls';
import { validatePassword } from '../../../Services/Onboarding/ValidatePassword';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../../Services/constants';
import { withRouter } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import { BasicResponseInterface } from '../../../api/TequilApiResponseInterfaces';
import { tequilApiResponseHandler } from '../../../Services/TequilApi/OnboardingResponseHandler';
import { useHistory } from 'react-router';

interface StateInterface {
    passwordRepeat: string;
    password: string;
    apiToken: string;
    checked: boolean;
    error: boolean;
    errorMessage: string;
}

const NodeSettings = () => {
    const history = useHistory();
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
            authChangePassword({
                username: DEFAULT_USERNAME,
                oldPassword: DEFAULT_PASSWORD,
                newPassword: values.password,
            }).then((response) => {
                handleAuthChangePasswordResponse(response);
            });
        } else {
            setValues({ ...values, error: true, errorMessage: isPasswordValid.errorMessage });
        }
    };

    const handleAuthChangePasswordResponse = (authChangePasswordResponse: BasicResponseInterface): void => {
        if (tequilApiResponseHandler(history, authChangePasswordResponse)) {
            checkNodeClaim();
        }
    };

    const checkNodeClaim = (): void => {
        if (values.checked) {
            claimMMNNode(values.apiToken).then((resonse) => {
                handleClaimMMNNodeResponse(resonse);
            });
        } else {
            history.push(ONBOARDING_PAYOUT_SETTINGS);
        }
    };

    const handleClaimMMNNodeResponse = (claimMMNNodeResponse: BasicResponseInterface): void => {
        if (tequilApiResponseHandler(history, claimMMNNodeResponse)) {
            history.push(ONBOARDING_PAYOUT_SETTINGS);
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
                    <span className="btn-text">Next</span>
                </div>
            </div>
        </div>
    );
};
export default withRouter(NodeSettings);
