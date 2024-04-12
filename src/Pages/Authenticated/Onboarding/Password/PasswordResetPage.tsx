/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PasswordSetComponents } from './PasswordSetComponents'
import React, { useState } from 'react'
import { InputGroup } from '../../../../Components/Inputs/InputGroup'
import { TextField } from '../../../../Components/Inputs/TextField'
import styled from 'styled-components'
import { Form } from '../../../../Components/Inputs/Form'
import { validatePassword } from '../../../../commons/passwords'
import toasts from '../../../../commons/toasts'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../../constants/defaults'
import { store } from '../../../../redux/store'
import { updateAuthenticatedStore } from '../../../../redux/app.slice'
import errors from '../../../../commons/errors'
import { tequila } from '../../../../api/tequila'
import { InfoIcon } from '../../../../Components/Icons/Icons'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'
import { devices } from '../../../../theme/themes'

const { api } = tequila

const { Page, LockRow, StartButton, GTitle, GSubTitle, GDescription, GradientCard, Welcome, WhiteCard } =
  PasswordSetComponents

const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const ToolTipIcon = styled(InfoIcon)`
  height: 20px;
  width: 20px;
`

const TooltipContent = styled.div`
  max-width: 400px;
  line-height: 26px;

  @media ${devices.tablet} {
    max-width: fit-content;
    width: 300px;
  }
`

interface State {
  password: string
  confirmPassword: string
  passwordError: string
}

const INITIAL_STATE: State = {
  password: '',
  confirmPassword: '',
  passwordError: '',
}

export const PasswordResetPage = () => {
  const [state, setState] = useState({
    ...INITIAL_STATE,
  })

  const handlePassword = (value: string) => setState((p) => ({ ...p, password: value, passwordError: '' }))
  const handleConfirmPassword = (value: string) =>
    setState((p) => ({ ...p, confirmPassword: value, passwordError: '' }))
  const handlePasswordError = (value: string) => setState((p) => ({ ...p, passwordError: value }))
  const [loading, setLoading] = useState(false)

  const passwordError = state.passwordError.length > 0

  const handleSubmit = async () => {
    const validationResult = validatePassword(state.password, state.confirmPassword)
    if (!validationResult.success) {
      toasts.toastError(validationResult.errorMessage)
      handlePasswordError(validationResult.errorMessage)
      return
    }

    try {
      setLoading(true)
      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })

      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <WhiteCard>
          <Welcome />
          <GradientCard>
            <GTitle $textAlign="center">Password Reset</GTitle>
            <GSubTitle>
              Create Password{' '}
              <Tooltip
                content={
                  <TooltipContent>
                    Please set your Node Web UI password. It gives you protected external access to the node from the
                    local network or the Internet. You can always reset the Web UI password locally, by deleting the:{' '}
                    <b>
                      <i>nodeui-pass</i>
                    </b>{' '}
                    file in your Node data directory. Your password must contain at least 10 characters.
                  </TooltipContent>
                }
              >
                <ToolTipIcon />
              </Tooltip>
            </GSubTitle>
            <GDescription>
              Please set your Node UI password. Your password must contain at least 10 characters.
            </GDescription>
            <PasswordInputs>
              <InputGroup
                error={state.passwordError}
                title="Password"
                fluid={true}
                input={
                  <TextField
                    error={passwordError}
                    type="password"
                    value={state.password}
                    onChange={handlePassword}
                    disabled={loading}
                  />
                }
              />
              <InputGroup
                error={state.passwordError}
                title="Confirm password"
                fluid
                input={
                  <TextField
                    error={passwordError}
                    type="password"
                    value={state.confirmPassword}
                    onChange={handleConfirmPassword}
                    disabled={loading}
                  />
                }
              />
            </PasswordInputs>
            <StartButton loading={loading} type="submit" size="large" label="CONFIRM" rounded />
            <LockRow />
          </GradientCard>
        </WhiteCard>
      </Form>
    </Page>
  )
}
