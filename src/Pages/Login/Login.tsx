import React from "react";
import sideImageOnboarding from "../../assets/images/onboarding/SideImage.png";
import "../../assets/styles/pages/login/main.scss"
import {DefaultTextField} from "../../Components/DefaultTextField";
import {authLogin} from '../../api/User'
import {DEFAULT_USERNAME} from '../../Services/constants'
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {Redirect} from "react-router-dom";


interface StateInterface {
  password: string;
  error: boolean
}
interface PropsInterface {
  onboardingPassed: boolean
}

const Login = (props: PropsInterface) => {
  const [values, setValues] = React.useState<StateInterface>({
    password: '',
    error: false
  });

  const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value});
  };

  const handleLogin = () => {
    setValues({...values, error: false});
    authLogin({username: DEFAULT_USERNAME, password: values.password}).then(response => {
      if (response.success) {
        // TODO REDIRECT TO DASHBOARD
      } else {
        if (response.isAuthoriseError) {
          setValues({...values, error: true});
        }
      }
    });
  };

  return (
    props.onboardingPassed ?
    <div className="login wrapper">
      <div className="login-content">
        <div className="login-content-block">
          <h1 className="login-content-block--heading">Welcome node runner!</h1>
          <p className="login-content-block--heading-paragraph">Lets get you up and running. </p>
          <div className="login-content-block--password-block">
            <Collapse in={values.error}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Bad credentials
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
            <div className="password-actions-block">
              <a href="#">Forgot password?</a>
              <div onClick={handleLogin} className="btn btn-filled login"><span
                className="btn-text">Sing In</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="side">
        <img alt="onboarding" src={sideImageOnboarding}/>
      </div>
    </div>
      :
      <Redirect to={"/"} />
  )
};

export default Login;