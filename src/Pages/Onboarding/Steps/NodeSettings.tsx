import React from "react";
import {StepCounter} from "../StepCounter";
import {Link} from "react-router-dom";
import { DefaultTextField } from '../../../Components/DefaultTextField'
import "../../../assets/styles/pages/onboarding/steps/node-settings.scss"
import {DefaultCheckbox} from "../../../Components/Checkbox/DefaultCheckbox";

interface State {
  passwordRepeat: string;
  password: string;
  apiToken: string;
}

const NodeSettings = () => {
  const [values, setValues] = React.useState<State>({
    passwordRepeat: '',
    password: '',
    apiToken: 'l3Q45qGFwKKBWJRKAVJN9J34l'
  });

  const handleTextFieldsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
          <DefaultCheckbox checked={checked} handleCheckboxChange={() => handleCheckboxChange} label="Claim this node in my.mysterium.network" />
        </div>
        <div className="api-token-block">
          <p className="text-field-label">API Token (get it <a href="#">here</a>)</p>
          <DefaultTextField
            handleChange={handleTextFieldsChange}
            value={values.apiToken}
            stateName="apiToken"
          />
        </div>
        <Link to="/onboarding/backup" className="btn btn-filled next"><span className="btn-text">Next</span></Link>
      </div>
      <StepCounter step={5}/>
    </div>
  );
};

export default NodeSettings;