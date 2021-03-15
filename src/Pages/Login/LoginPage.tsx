/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FormEvent } from 'react'
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'

import { updateAuthenticatedStore } from '../../redux/app.slice'
import { store } from '../../redux/store'
import sideImageOnboarding from '../../assets/images/onboarding/SideImage.png'
import '../../assets/styles/pages/login/main.scss'
import { TextField } from '../../Components/TextField'
import { DEFAULT_USERNAME } from '../../constants/defaults'
import Button from '../../Components/Buttons/Button'
import { login } from '../../api/TequilAPIWrapper'

interface Props {
  onSuccessLogin: () => void
}

interface StateProps {
  password: string
  error: boolean
  isLoading: boolean
}

const DOCS_URL = 'https://docs.mysterium.network/node-runners/troubleshooting/#forgot-password'

const LoginPage = ({ onSuccessLogin }: Props) => {
  const [state, setState] = React.useState<StateProps>({
    password: '',
    error: false,
    isLoading: false,
  })

  const handleTextFieldsChange = (prop: keyof StateProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setState((cs) => ({ ...cs, [prop]: value }))
  }

  const handleLogin = (e: FormEvent<any>) => {
    e.preventDefault()
    setState((cs) => ({ ...cs, error: false, isLoading: true }))
    login(DEFAULT_USERNAME, state.password)
      .then(() => store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false })))
      .then(() => onSuccessLogin())
      .catch(() => setState((cs) => ({ ...cs, error: true, isLoading: false })))
  }
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
                <TextField
                  handleChange={handleTextFieldsChange}
                  password={true}
                  value={state.password}
                  stateName="password"
                />
              </div>

              <div className="password-actions-block">
                {/* we can get config after login only */}
                <a href={DOCS_URL}>Forgot password?</a>
                <Button type="submit" isLoading={state.isLoading}>
                  Sign In
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
  )
}

export default LoginPage
