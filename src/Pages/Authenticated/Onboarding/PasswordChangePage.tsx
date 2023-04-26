/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import { Form } from '../../../Components/Inputs/Form'
import { InputGroup } from '../../../Components/Inputs/InputGroup'
import { TextField } from '../../../Components/Inputs/TextField'
import { Button } from '../../../Components/Inputs/Button'
import { DEFAULT_PASSWORD, DEFAULT_USERNAME } from '../../../constants/defaults'
import { store } from '../../../redux/store'
import { updateAuthenticatedStore } from '../../../redux/app.slice'
import { tequila } from '../../../api/tequila'
import errors from '../../../commons/errors'
import toasts from '../../../commons/toasts'
import { validatePassword } from '../../../commons/passwords'
import { Checkbox } from '../../../Components/Inputs/Checkbox'
import Background from '../../../assets/images/onboarding/background.png'
import { ReactComponent as Lock } from '../../../assets/images/onboarding/password.svg'
import { devices } from '../../../theme/themes'
import { TOSModal } from '../Components/TOSModal/TOSModal'
import { Link } from '../../../Components/Common/Link'
import complexActions from '../../../redux/complex.actions'
import { WelcomePage } from './WelcomePage'
import { alphaToHex } from '../../../theme/themeCommon'
const { api } = tequila
const Logo = styled(Lock)`
  height: 500px;
  width: 500px;
  @media ${devices.tablet} {
    height: 250px;
    width: 250px;
  }
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${devices.tablet} {
    align-self: center;
  }
  @media ${devices.mobileS} {
    display: none;
  }
`
const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorDarkBlue};
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeNormal};
  }
`
const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => `${theme.common.colorGrayBlue}${alphaToHex(0.25)}`};
`

const Comment = styled.p`
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeNormal};
  }
`
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
  background-color: ${({ theme }) => theme.common.colorLightBlue};
  @media ${devices.tablet} {
    padding-top: 30px;
    height: 100%;
    width: 100%;
  }
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${devices.tablet} {
    gap: 5px;
  }
`
const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const LinkButton = styled.div`
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2em;
  cursor: pointer;
`

const Row = styled.div`
  display: flex;
  gap: 5px;
  @media ${devices.mobileS} {
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.common.colorWhite};
  box-shadow: 0 4px 50px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  height: 550px;
  gap: 100px;
  display: flex;

  align-items: center;
  padding: 40px;
  @media ${devices.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    height: 750px;
    width: 350px;
    padding: 10px;
  }
  @media ${devices.mobileS} {
    width: 275px;
    height: max-content;
    padding: 20px 5px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 600px;
  min-width: 400px;
  @media ${devices.tablet} {
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    min-width: unset;
    margin-bottom: 10px;
  }
`
const ButtonRow = styled.div`
  margin-top: 20px;
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
`
const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

interface State {
  password: string
  confirmPassword: string
  agreeTos: boolean
  mmnApiKey: string
  mmnError: string
  passwordError: string
  showTos: boolean
}

const INITIAL_STATE: State = {
  password: '',
  confirmPassword: '',
  agreeTos: false,
  mmnApiKey: '',
  mmnError: '',
  passwordError: '',
  showTos: false,
}

export const PasswordChangePage = () => {
  const query = useQuery()
  const mmnApiKey = query.get('mmnApiKey')

  const [state, setState] = useState({
    ...INITIAL_STATE,
    claim: mmnApiKey !== null,
    mmnApiKey: mmnApiKey ?? '',
  })

  const [loading, setLoading] = useState(false)
  const [showWelcomePage, setShowWelcomePage] = useState(true)
  const closeWelcomePage = () => setShowWelcomePage(false)

  const handlePassword = (value: string) => setState((p) => ({ ...p, password: value, passwordError: '' }))
  const handleConfirmPassword = (value: string) =>
    setState((p) => ({ ...p, confirmPassword: value, passwordError: '' }))
  const handleTOS = (value: boolean) => setState((p) => ({ ...p, agreeTos: value }))
  const handleMmnApiKey = (value: string) => setState((p) => ({ ...p, mmnApiKey: value }))
  const setMmnError = (value: string) => setState((p) => ({ ...p, mmnError: value }))
  const handlePasswordError = (value: string) => setState((p) => ({ ...p, passwordError: value }))
  const showTos = (b: boolean = true) => setState((p) => ({ ...p, showTos: b }))

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
  const shouldClaim = state.mmnApiKey.length > 0
  const passwordError = state.passwordError.length > 0
  const mmnError = state.mmnError.length > 0
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

      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
    } catch (err: any) {
      errors.parseToastError(err)
    }
    setLoading(false)
  }

  return (
    <>
      {showWelcomePage && <WelcomePage close={closeWelcomePage} />}
      <Form onSubmit={handleSubmit}>
        <Page>
          <Card>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Container>
              <Footer>
                <Title>Create Password</Title>
                <Comment>Please set your Node UI password. Your password must contain at least 10 characters.</Comment>
              </Footer>

              <PasswordInputs>
                <InputGroup
                  error={state.passwordError}
                  title="Password"
                  fluid={true}
                  input={
                    <TextField error={passwordError} type="password" value={state.password} onChange={handlePassword} />
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
                    />
                  }
                />
                <Row>
                  <Checkbox checked={state.agreeTos} onChange={handleTOS} /> I agree to
                  <LinkButton onClick={() => showTos()}>Terms and Conditions</LinkButton>
                </Row>
              </PasswordInputs>
              <Divider />
              <Footer>
                <Title>Connect your node to mystnodes.com</Title>
                <Comment>
                  To manage your node and view statistics on{' '}
                  <Link href="https://mystnodes.com/me" target="_blank">
                    mystnodes.com
                  </Link>
                  , enter your API key obtained from{' '}
                  <Link href="https://mystnodes.com/" target="_blank">
                    mystnodes.com/me
                  </Link>
                  . As a first-time user, you may be eligible for a free node registration.
                </Comment>
                <InputGroup
                  error={state.mmnError}
                  fluid
                  input={
                    <TextField
                      disabled={mmnApiKey !== null}
                      error={mmnError}
                      value={state.mmnApiKey}
                      onChange={handleClaim}
                    />
                  }
                />
              </Footer>
            </Container>
          </Card>
          <ButtonRow>
            <Button
              size="large"
              rounded
              loading={loading}
              label={state.claim ? 'Set Password and Claim' : 'Set password'}
            />
          </ButtonRow>
        </Page>
      </Form>
      <TOSModal show={state.showTos} hideAgree onClose={() => showTos(false)} onCloseLabel="Close" />
    </>
  )
}
