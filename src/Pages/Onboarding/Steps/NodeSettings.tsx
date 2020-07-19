import React from "react";
import {DefaultTextField} from '../../../Components/DefaultTextField'
import "../../../assets/styles/pages/onboarding/steps/node-settings.scss"
import {DefaultCheckbox} from "../../../Components/Checkbox/DefaultCheckbox";
import {authChangePassword} from "../../../api/User";
import {validatePassword} from '../../../Services/Onboarding/ValidatePassword'
import {DEFAULT_USERNAME, DEFAULT_PASSWORD} from '../../../Services/constants'
import {withRouter} from "react-router-dom";

interface NodeSettingsStateInterface {
  passwordRepeat: string;
  password: string;
  apiToken: string;
  checked: boolean
}

const NodeSettings = (props: any) => {
  const [values, setValues] = React.useState<NodeSettingsStateInterface>({
    passwordRepeat: '',
    password: '',
    apiToken: 'l3Q45qGFwKKBWJRKAVJN9J34l',
    checked: false
  });
  const handleTextFieldsChange = (prop: keyof NodeSettingsStateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, checked: event.target.checked});
  };

  const handleSubmitPassword = () => {
    let validatedPasssword = validatePassword(values.password, values.passwordRepeat);
    if (validatedPasssword.success) {
      authChangePassword({username: DEFAULT_USERNAME, oldPassword: DEFAULT_PASSWORD, newPassword: "mystberry"});
      if(values.checked){
        // TODO CLAIM NODE
      }
      props.history.push("/onboarding/payout-settings");
    } else {
      alert(validatedPasssword.errorMessage);
    }
  };
  return (
    <div className="step-block node-settings">
      <h1 className="step-block--heading">Node settings</h1>
      <p className="step-block--heading-paragraph">Fill in the following information to setup your node.</p>
      <div className="step-block-content">
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
          <DefaultCheckbox checked={values.checked} handleCheckboxChange={() => handleCheckboxChange}
                           label="Claim this node in my.mysterium.network"/>
        </div>
        <div className="api-token-block">
          <p className="text-field-label">API Token (get it <a href="#">here</a>)</p>
          <DefaultTextField
            handleChange={handleTextFieldsChange}
            value={values.apiToken}
            stateName="apiToken"
          />
        </div>
        <div onClick={handleSubmitPassword} className="btn btn-filled btn-center next"><span
          className="btn-text">Next</span></div>
      </div>
    </div>
  );
};
export default withRouter(NodeSettings);