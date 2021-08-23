/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { tequilapiClient } from '../../../api/TequilApiClient'
import { mmnDomainName, mmnWebAddress } from '../../../commons/config'
import { parseError } from '../../../commons/error.utils'
import { validatePassword } from '../../../commons/password'
import Button from '../../../Components/Buttons/Button'
import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import { TextField } from '../../../Components/TextField/TextField'
import Errors from '../../../Components/Validation/Errors'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../constants/defaults'
import { updateAuthenticatedStore } from '../../../redux/app.slice'

import { store } from '../../../redux/store'

interface State {
  passwordRepeat?: string
  password?: string
  apiKey: string
  useApiKey: boolean
  loading: boolean
  error: boolean
  errorMessage: string
  nodeClaimed: boolean
}

interface Props {
  config?: Config
  callbacks: OnboardingChildProps
}

const PasswordChange = ({ config }: Props): JSX.Element => {
  const [state, setState] = useImmer<State>({
    passwordRepeat: '',
    password: '',
    apiKey: '',
    useApiKey: false,
    error: false,
    errorMessage: '',
    nodeClaimed: false,
    loading: false,
  })

  useEffect(() => {
    tequilapiClient.getMMNApiKey().then((resp) => {
      setState((d) => {
        d.apiKey = resp.apiKey
      })
    })
  }, [])

  const onPasswordChange = (value: string) => {
    setState((d) => {
      d.password = value
    })
  }

  const onPasswordRepeatChange = (value: string) => {
    setState((d) => {
      d.passwordRepeat = value
    })
  }

  const onApiKeyChange = (value: string) => {
    setState((d) => {
      d.apiKey = value
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((d) => {
      d.useApiKey = event.target.checked
    })
  }

  const handleSubmitPassword = async () => {
    setState((d) => {
      d.loading = true
      d.error = false
    })

    if (state.useApiKey && !state.apiKey) {
      setState((d) => {
        d.error = true
        d.errorMessage = 'Please enter MMN ApiKey'
        d.loading = false
      })
      return
    }

    const isPasswordValid = validatePassword(state.password, state.passwordRepeat)
    if (!isPasswordValid.success) {
      setState((d) => {
        d.error = true
        d.errorMessage = isPasswordValid.errorMessage
        d.loading = false
      })

      return
    }

    try {
      if (state.useApiKey) {
        await tequilapiClient.setMMNApiKey(state.apiKey)
      }

      await tequilapiClient.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password || '',
      })

      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (err) {
      const msg = parseError(err)
      setState((d) => {
        d.error = true
        d.errorMessage = msg
      })
    } finally {
      setState((d) => {
        d.loading = false
      })
    }
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
          <TextField onChange={onPasswordChange} password={true} placeholder={'*********'} value={state.password} />
        </div>
        <div className="input-group">
          <p className="input-group__label">Repeat password</p>
          <TextField
            onChange={onPasswordRepeatChange}
            password={true}
            placeholder={'*********'}
            value={state.passwordRepeat}
          />
        </div>
        <div className="input-group m-t-50 m-b-20">
          <Checkbox
            checked={state.useApiKey}
            handleCheckboxChange={handleCheckboxChange}
            label={'Claim this node in ' + mmnDomainName(config)}
          />
        </div>
        {state.useApiKey ? (
          <div className="input-group m-t-20">
            <p className="input-group__label">
              API Key (
              <a href={`${mmnWebAddress(config)}/user/profile`} target="_blank" rel="noopener noreferrer">
                Get it here
              </a>
              )
            </p>
            <TextField onChange={onApiKeyChange} value={state.apiKey} placeholder={'Your API token'} />
          </div>
        ) : null}
        <div className="step__content-buttons step__content-buttons--center m-t-30">
          <Button isLoading={state.loading} onClick={handleSubmitPassword}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PasswordChange
