/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Collapse from '@material-ui/core/Collapse'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { FormEvent } from 'react'
import { useImmer } from 'use-immer'
import { login } from '../../api/ApiWrapper'
import sideImageOnboarding from '../../assets/images/onboarding/SideImage.png'
import Button from '../../Components/Buttons/Button'
import { TextField } from '../../Components/TextField/TextField'
import { DEFAULT_USERNAME } from '../../constants/defaults'

import { updateAuthenticatedStore } from '../../redux/app.slice'
import { store } from '../../redux/store'
import './LoginPage.scss'

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
  const [state, setState] = useImmer<StateProps>({
    password: '',
    error: false,
    isLoading: false,
  })

  const handleTextFieldsChange = (value: string) => {
    setState((d) => {
      d.password = value
    })
  }

  const handleLogin = async (e: FormEvent<any>) => {
    e.preventDefault()
    setState((d) => {
      d.error = false
      d.isLoading = true
    })

    try {
      await login(DEFAULT_USERNAME, state.password)
      await onSuccessLogin()
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (_) {
      setState((d) => {
        d.error = true
      })
    } finally {
      setState((d) => {
        d.isLoading = false
      })
    }
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
                <TextField onChange={handleTextFieldsChange} type="password" value={state.password} />
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
