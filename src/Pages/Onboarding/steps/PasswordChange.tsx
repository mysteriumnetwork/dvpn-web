/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { mmnDomainName, mmnWebAddress } from '../../../commons/config'
import Errors from '../../../Components/Validation/Errors'

import { store } from '../../../redux/store'
import { updateAuthenticatedStore } from '../../../redux/app.slice'
import { TextField } from '../../../Components/TextField'
import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import { validatePassword } from '../../../commons/password'
import { DEFAULT_USERNAME, DEFAULT_PASSWORD } from '../../../constants/defaults'
import { tequilapiClient } from '../../../api/TequilApiClient'
import Button from '../../../Components/Buttons/Button'
import { parseError, parseMMNError } from '../../../commons/error.utils'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { useHistory } from 'react-router-dom'
import { DASHBOARD } from '../../../constants/routes'

interface State {
  passwordRepeat?: string
  password?: string
  apiKey: string
  checked: boolean
  error: boolean
  errorMessage: string
  nodeClaimed: boolean
}

const API_CALL_FAILED = 'API Call failed.'

interface Props {
  config?: Config
  callbacks: OnboardingChildProps
}

const PasswordChange = ({ callbacks, config }: Props): JSX.Element => {
  const history = useHistory()
  const [state, setState] = React.useState<State>({
    passwordRepeat: '',
    password: '',
    apiKey: '',
    checked: false,
    error: false,
    errorMessage: '',
    nodeClaimed: false,
  })

  useEffect(() => {
    tequilapiClient.getMMNApiKey().then((resp) => {
      setState((cs) => ({ ...cs, apiKey: resp.apiKey }))
    })
  }, [])

  const handleTextFieldsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setState((cs) => ({ ...cs, [prop]: value }))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((cs) => ({ ...cs, checked: event.target.checked }))
  }

  const handleSubmitPassword = async () => {
    setState((cs) => ({ ...cs, error: false }))

    if (state.checked && !state.apiKey) {
      setState((cs) => ({ ...cs, error: true, errorMessage: 'Please enter MMN ApiKey' }))
      return
    }

    const isPasswordValid = validatePassword(state.password, state.passwordRepeat)
    if (!isPasswordValid.success) {
      setState((cs) => ({ ...cs, error: true, errorMessage: isPasswordValid.errorMessage }))
      return
    }

    ;(state.checked ? tequilapiClient.setMMNApiKey(state.apiKey) : Promise.resolve())
      .then(
        () =>
          tequilapiClient.authChangePassword({
            username: DEFAULT_USERNAME,
            oldPassword: DEFAULT_PASSWORD,
            newPassword: state.password || '',
          }),
        (mmnError) =>
          setState((cs) => ({ ...cs, error: true, errorMessage: parseMMNError(mmnError) || API_CALL_FAILED })),
      )
      .then(() => store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false })))
      .then(() => callbacks.nextStep())
      .then(() => history.push(DASHBOARD))
      .catch((error) => {
        setState((cs) => ({ ...cs, error: true, errorMessage: parseError(error) || API_CALL_FAILED }))
        console.log(error)
      })
  }

  return (
    <div className="step">
      <h1 className="step__title">Node settings</h1>
      <p className="step__description">Fill in the following information to finish setting up your node.</p>
      <div className="step__content m-t-100">
        <p className="step__description m-b-20">
          <strong>Please change the default WebUI password. At least 10 characters are required.</strong>
        </p>
        <Errors error={state.error} errorMessage={state.errorMessage} />
        <div className="input-group">
          <p className="input-group__label">Web UI password</p>
          <TextField
            handleChange={handleTextFieldsChange}
            password={true}
            placeholder={'*********'}
            value={state.password}
            stateName="password"
          />
        </div>
        <div className="input-group">
          <p className="input-group__label">Repeat password</p>
          <TextField
            handleChange={handleTextFieldsChange}
            password={true}
            placeholder={'*********'}
            value={state.passwordRepeat}
            stateName="passwordRepeat"
          />
        </div>
        <div className="input-group m-t-50 m-b-20">
          <Checkbox
            checked={state.checked}
            handleCheckboxChange={handleCheckboxChange}
            label={'Claim this node in ' + mmnDomainName(config)}
          />
        </div>
        {state.checked ? (
          <div className="input-group m-t-20">
            <p className="input-group__label">
              API Key (
              <a href={`${mmnWebAddress(config)}/user/profile`} target="_blank" rel="noopener noreferrer">
                Get it here
              </a>
              )
            </p>
            <TextField
              handleChange={handleTextFieldsChange}
              value={state.apiKey}
              placeholder={'Your API token'}
              stateName="apiKey"
            />
          </div>
        ) : null}
        <div className="step__content-buttons step__content-buttons--center m-t-30">
          <Button onClick={handleSubmitPassword}>Save & Continue</Button>
        </div>
      </div>
    </div>
  )
}
export default PasswordChange
