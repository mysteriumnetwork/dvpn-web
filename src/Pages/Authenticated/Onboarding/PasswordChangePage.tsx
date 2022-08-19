/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import React, { useMemo, useState } from 'react'
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
import { Tooltip } from '../../../Components/Tooltip/Tooltip'
import { Link } from '../../../Components/Common/Link'

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
`
const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorDarkBlue};
  font-size: 28px;
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeHuge};
  }
`
const SecondaryTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.common.colorDarkBlue};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
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
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  @media ${devices.tablet} {
    align-self: flex-start;
  }
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 70px;
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
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
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.common.colorWhite};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.09);
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
`
const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media ${devices.tablet} {
    justify-content: flex-start;
    padding: 0 10px;
    width: 100%;
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
    mmnApiKey: mmnApiKey !== null ? mmnApiKey : '',
  })
  const [loading, setLoading] = useState(false)
  const TooltipContent = useMemo(() => {
    return (
      <div>
        Get your key from
        <Link href="https://mystnodes.com/me" target="_blank">
          {' '}
          mystnodes.com/me{' '}
        </Link>
        and connect your node to
        <Link href="https://mystnodes.com/" target="_blank">
          {' '}
          mystnodes.com
        </Link>
        , to manage and see your statistics
      </div>
    )
  }, [])

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
      setMmnError('API key myst be 40 characters')
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
      if (shouldClaim) {
        await api.setMMNApiKey(state.mmnApiKey)
      }

      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
      if (state.agreeTos) {
        await tequila.acceptWithTermsAndConditions()
      }
    } catch (err: any) {
      const apiError = errors.apiError(err)
      toasts.toastError(apiError.human())
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Page>
          <Card>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <Container>
              <Header>
                <Title>Create Password</Title>
                <Comment>Please set your Node UI password. Your password must contain at least 10 characters.</Comment>
              </Header>
              <InputContainer>
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
              </InputContainer>
              <Footer>
                <SecondaryTitle>
                  Connect your node to mystnodes.com
                  <Tooltip variant="?" content={TooltipContent} />
                </SecondaryTitle>
                <InputGroup
                  error={state.mmnError}
                  fluid
                  input={<TextField error={mmnError} value={state.mmnApiKey} onChange={handleClaim} />}
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
