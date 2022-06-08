/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import React, { FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { tequila } from '../../../api/wrapped-calls'
import { configs } from '../../../commons/config'
import errors from '../../../commons/errors'
import { validatePassword } from '../../../commons/passwords'
import Button from '../../../Components/Buttons/Button'
import { Checkbox } from '../../../Components/Checkbox/Checkbox'
import Tooltip from '../../../Components/Tooltip/Tooltip'
import { TextField } from '../../../Components/TextField/TextField'
import Error from '../../../Components/Validation/Error'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../constants/defaults'
import { updateAuthenticatedStore } from '../../../redux/app.slice'
import { StepLayout } from '../Components/StepLayout'
import styles from './Steps.module.scss'

import { store } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { selectors } from '../../../redux/selectors'
import classNames from 'classnames'
import { InputGroup } from '../../../Components/InputGroups/InputGroup'

const { api } = tequila

interface State {
  passwordRepeat?: string
  password: string
  apiKey: string
  urlApiKey: boolean
  useApiKey: boolean
  loading: boolean
  error: boolean
  errorMessage: string
  showClaim: boolean
  mmnDomain: string
}

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const SetPassword = (_: StepProps): JSX.Element => {
  const query = useQuery()

  const config = useSelector(selectors.configSelector)

  const [state, setState] = useState<State>({
    passwordRepeat: '',
    password: '',
    apiKey: '',
    urlApiKey: false,
    useApiKey: false,
    error: false,
    errorMessage: '',
    showClaim: false,
    loading: false,
    mmnDomain: '',
  })

  useEffect(() => {
    setState((p) => ({ ...p, mmnDomain: configs.mmnDomainName(config) }))

    const urlApiKey = query.get('mmnApiKey')
    if (urlApiKey !== null && urlApiKey.length > 0) {
      setState((d) => ({ ...d, apiKey: urlApiKey, useApiKey: true, urlApiKey: true, showClaim: true }))
    } else {
      api.getMMNApiKey().then((resp) => {
        setState((d) => ({
          ...d,
          apiKey: resp.apiKey,
          showClaim: d.apiKey === undefined || d.apiKey?.length === 0 || state.mmnDomain === 'error',
        }))
      })
    }
  }, [])

  const onPasswordChange = (value: string) => {
    setState((d) => ({ ...d, password: value }))
  }

  const onPasswordRepeatChange = (value: string) => {
    setState((d) => ({ ...d, passwordRepeat: value }))
  }

  const onApiKeyChange = (value: string) => {
    setState((d) => ({ ...d, apiKey: value }))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((d) => ({ ...d, useApiKey: event.target.checked }))
  }

  const handleSubmitPassword = async (e: FormEvent<any>) => {
    e.preventDefault()

    setState((d) => ({ ...d, loading: true, error: false }))

    if (state.useApiKey && !state.apiKey) {
      setState((d) => ({ ...d, error: true, errorMessage: 'Please enter mystnodes.com API key', loading: false }))
      return
    }

    const isPasswordValid = validatePassword(state.password, state.passwordRepeat)
    if (!isPasswordValid.success) {
      setState((d) => ({ ...d, error: true, errorMessage: isPasswordValid.errorMessage, loading: false }))

      return
    }

    try {
      if (state.useApiKey) {
        await api.setMMNApiKey(state.apiKey)
      }

      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })

      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (err: any) {
      const apiError = errors.apiError(err)

      setState((d) => ({
        ...d,
        error: true,
        errorMessage: apiError.human(),
      }))
    } finally {
      setState((d) => ({ ...d, loading: false }))
    }
  }

  return (
    <StepLayout
      title="Node settings"
      description="Fill in the following information to finish setting up your node."
      controlsCentered
    >
      <form onSubmit={handleSubmitPassword}>
        <p className={classNames(styles.passwordContentDescription, 'm-b-20')}>
          <strong>Please create default WebUI password. At least 10 characters are required.</strong>
        </p>
        <Error show={state.error} errorMessage={state.errorMessage} />
        <InputGroup label="Node UI password">
          <TextField onChange={onPasswordChange} type="password" placeholder={'*********'} value={state.password} />
        </InputGroup>
        <InputGroup label="Repeat password">
          <TextField
            onChange={onPasswordRepeatChange}
            type="password"
            placeholder={'*********'}
            value={state.passwordRepeat}
          />
        </InputGroup>
        {state.showClaim && (
          <MMNClaim
            config={config}
            state={state}
            onApiKeyChange={onApiKeyChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}

        <div className={classNames(styles.controls, styles.controlsCentered, 'm-t-30')}>
          <Button isLoading={state.loading} type="submit" autoFocus>
            Save & Continue
          </Button>
        </div>
      </form>
    </StepLayout>
  )
}

const MMNClaim = ({
  config,
  state,
  onApiKeyChange,
  handleCheckboxChange,
}: {
  config?: Config
  state: State
  onApiKeyChange: (value: string) => void
  handleCheckboxChange: SwitchBaseProps['onChange']
}) => {
  return (
    <>
      <div className={classNames(styles.claimRow, 'input-group', 'm-t-50', 'm-b-20')}>
        <Checkbox
          checked={state.useApiKey}
          handleCheckboxChange={handleCheckboxChange}
          label={'Claim this node in ' + state.mmnDomain}
          disabled={state.urlApiKey}
        />
        <div className="m-l-15" />
        <Tooltip
          title={
            'If you claim your node you will be able to manage and see statistics for all your nodes in mystnodes.com'
          }
        />
      </div>
      {state.useApiKey ? (
        <div className="input-group m-t-20">
          {!state.urlApiKey && (
            <p className="input-group__label">
              API Key (
              <a href={`${configs.mmnWebAddress(config)}/me`} target="_blank" rel="noopener noreferrer">
                Get it here
              </a>
              )
            </p>
          )}
          <TextField onChange={onApiKeyChange} value={state.apiKey} placeholder={'Your API token'} />
        </div>
      ) : null}
    </>
  )
}

export default SetPassword
