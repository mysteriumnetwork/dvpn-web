/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PasswordSetComponents } from './PasswordSetComponents'
import { TOS } from './TOS'
import React, { useEffect, useState } from 'react'
import ROUTES from '../../../../constants/routes'
import { InternalLink, Link } from '../../../../components/Common/Link'
import { useIsFeatureEnabled } from '../../../../commons/hooks'
import FEATURES from '../../../../commons/features'
import { InputGroup } from '../../../../components/Inputs/InputGroup'
import { TextField } from '../../../../components/Inputs/TextField'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Form } from '../../../../components/Inputs/Form'
import { validatePassword } from '../../../../commons/passwords'
import toasts from '../../../../commons/toasts'
import complexActions from '../../../../redux/complex.actions'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../../constants/defaults'
import { store } from '../../../../redux/store'
import { updateAuthenticatedStore } from '../../../../redux/app.slice'
import errors from '../../../../commons/errors'
import { tequila } from '../../../../api/tequila'
import { InfoIcon } from '../../../../components/Icons/Icons'
import { Tooltip } from '../../../../components/Tooltip/Tooltip'
import { devices } from '../../../../theme/themes'
import { events } from '../../../../commons/events'
import Button from '../../../../components/Buttons/Button'

const { api } = tequila

const { Page, LockRow, GTitle, GSubTitle, GDescription, GradientCard, Welcome, WhiteCard } = PasswordSetComponents

const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

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
  agreeTos: boolean
  mmnApiKey: string
  mmnError: string
  passwordError: string
}

const INITIAL_STATE: State = {
  password: '',
  confirmPassword: '',
  agreeTos: false,
  mmnApiKey: '',
  mmnError: '',
  passwordError: '',
}

export const AdvancedBoardingPage = () => {
  const isClickBoardDisabled = useIsFeatureEnabled(FEATURES.DISABLE_CLICKBOARDING)

  const location = useLocation()

  const query = useQuery()
  const mmnApiKey = query.get('mmnApiKey')
  const [state, setState] = useState({
    ...INITIAL_STATE,
    claim: mmnApiKey !== null,
    mmnApiKey: mmnApiKey ?? '',
  })

  useEffect(() => {
    events.send('page_view_advanced_onboarding')
  }, [])

  const handlePassword = (value: string) => setState((p) => ({ ...p, password: value, passwordError: '' }))
  const handleConfirmPassword = (value: string) =>
    setState((p) => ({ ...p, confirmPassword: value, passwordError: '' }))
  const handleClaim = (value: string) => {
    handleMmnApiKey(value)
    if (value.length === 40 || value.length === 0) {
      setMmnError('')
      return
    }
    if (value.length !== 40) {
      setMmnError('API key must be 40 characters')
      return
    }
  }
  const handleMmnApiKey = (value: string) => setState((p) => ({ ...p, mmnApiKey: value }))
  const setMmnError = (value: string) => setState((p) => ({ ...p, mmnError: value }))
  const handlePasswordError = (value: string) => setState((p) => ({ ...p, passwordError: value }))
  const [loading, setLoading] = useState(false)

  const passwordError = state.passwordError.length > 0
  const mmnError = state.mmnError.length > 0
  const shouldClaim = state.mmnApiKey.length > 0

  const handleSubmit = async () => {
    const validationResult = validatePassword(state.password, state.confirmPassword)
    if (!validationResult.success) {
      toasts.toastError(validationResult.errorMessage)
      handlePasswordError(validationResult.errorMessage)
      return
    }

    if (!state.agreeTos) {
      toasts.toastError('You must agree to Terms and Conditions to proceed')
      return
    }

    try {
      setLoading(true)
      if (state.agreeTos) {
        await complexActions.acceptWithTermsAndConditions()
      }

      if (shouldClaim) {
        await api.setMMNApiKey(state.mmnApiKey)
      }

      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })
      await events.send('click_advanced_onboarding_start')
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
            <GTitle $textAlign="center">Advanced onboarding</GTitle>
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
                <div>
                  <InfoIcon className="text-blue-225 size-4" />
                </div>
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
            <GSubTitle>Connect your Nodes whit my.mystnodes.com</GSubTitle>
            <GDescription>
              To manage your node and view statistic on{' '}
              <Link href="https://my.mystnodes.com" target="_blank">
                my.mystnodes.com
              </Link>
              , enter your API key obtained from{' '}
              <Link href="https://my.mystnodes.com/me" target="_blank">
                my.mystnodes.com/me
              </Link>
              . As a first time user,you may be eligible for a free node registration.
            </GDescription>
            <InputGroup
              error={state.mmnError}
              fluid
              input={
                <TextField
                  disabled={mmnApiKey !== null || loading}
                  error={mmnError}
                  value={state.mmnApiKey}
                  onChange={handleClaim}
                />
              }
            />
            <TOS
              onAgree={(checked) => {
                setState((p) => ({ ...p, agreeTos: checked }))
              }}
              isAgreed={state.agreeTos}
            />
            <Button loading={loading} fluid className="md:max-w-72" type="submit" label="CONFIRM" />
            {!isClickBoardDisabled && (
              <GDescription $textAlign="center">
                Easy setup? <InternalLink to={ROUTES.QUICK_ONBOARDING + location.search}>Quick onboarding</InternalLink>
              </GDescription>
            )}
            <LockRow />
          </GradientCard>
        </WhiteCard>
      </Form>
    </Page>
  )
}
