import React from "react";
import sideImageOnboarding from "../../assets/images/onboarding/SideImage.png";
import "../../assets/styles/pages/login/main.scss"
import {Link} from "react-router-dom";
import {DefaultTextField} from "../../Components/DefaultTextField";


interface StateInterface {
  password: string;
}

const Login = () => {
  const [values, setValues] = React.useState<StateInterface>({
    password: '',
  });

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };

  return (
    <div className="login wrapper">
      <div className="login-content">
        <div className="login-content-block">
          <h1 className="login-content-block--heading">Welcome node runner!</h1>
          <p className="login-content-block--heading-paragraph">Lets get you up and running. </p>
          <div className="login-content-block--password-block">
            <div className="password-input-block">
              <p className="text-field-label">Web UI password</p>
              <DefaultTextField
                handleChange={handleTextFieldsChange}
                password={true}
                value={values.password}
                stateName="password"
              />
            </div>
            <div className="password-actions-block">
              <a href="#">Forgot password?</a>
              <div className="btn btn-filled login"><span
                className="btn-text">Sing In</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="side">
        <img alt="onboarding" src={sideImageOnboarding}/>
      </div>
    </div>
  )
};

export default Login;