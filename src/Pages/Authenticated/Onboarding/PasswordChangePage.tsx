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
import Background from '../../../assets/images/onboarding/background.png'
import { ReactComponent as LockIcon } from '../../../assets/images/onboarding/password.svg'
import { devices } from '../../../theme/themes'
import { Link } from '../../../Components/Common/Link'
import complexActions from '../../../redux/complex.actions'
import { WelcomePage } from './WelcomePage'
import { Heading } from './Password/Heading'
import { urls } from '../../../commons/urls'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import routes from '../../../constants/routes'
import { ANDROID_DEEPLINK_CLICKBOARDING } from '../../../constants/urls'

const { api } = tequila

const Lock = styled(LockIcon)`
  height: 200px;
  width: 200px;
`
const Logo = styled.div`
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

const Divider = styled.div`
  height: 20px;
  @media ${devices.tablet} {
    height: unset;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  background-image: url(${Background});
  background-color: ${({ theme }) => theme.onboarding.bgOverlay};
  @media ${devices.tablet} {
    padding-top: 30px;
    height: 100%;
    width: 100%;
  }
`

const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.text.colorMain};

  @media ${devices.mobileS} {
    font-size: ${({ theme }) => theme.common.fontSizeSmall};
  }
  @media ${devices.tablet} {
    flex-direction: column-reverse;
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.onboarding.bgCard};
  box-shadow: 0 4px 50px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  display: flex;

  padding: 10px 40px 40px 40px;

  flex-direction: column;

  @media ${devices.tablet} {
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    //height: 750px;
    width: 350px;
    padding: 10px;
  }

  @media ${devices.mobileS} {
    width: 275px;
    height: max-content;
    padding: 20px 5px;
  }
`

const SectionSeparator = styled.div`
  border-left: 1px solid ${({ theme }) => theme.changePassword.separatorColor};
  height: 90%;
  @media ${devices.tablet} {
    border-left: unset;
    border-bottom: 1px solid ${({ theme }) => theme.changePassword.separatorColor};
    margin: 0 10px 20px 0;
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  height: 100%;
  max-width: 800px;
  min-width: 400px;

  width: 50%;

  padding: 0 34px 0 34px;

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
  display: flex;
  justify-content: center;
  width: 100%;
  @media ${devices.tablet} {
    margin-bottom: 20px;
  }
`

const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeHumongous};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorSecondary};
  margin-bottom: 30px;
`
const StyledButton = styled(Button)`
  width: 100%;
  @media ${devices.tablet} {
    width: 100%;
  }
`
const SectionTitleWithŽygisLogic = styled(SectionTitle)`
  width: 100%;
  text-align: center;
`

const CenteredDescription = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  @media ${devices.tablet} {
    text-align: center;
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

export const PasswordChangePage = () => {
  const config = useAppSelector(selectors.currentConfig)
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

  const getLinkAndRedirect = async () => {
    const { link } = await tequila.initClickBoarding(
      urls.featureAwareCurrentOrigin(config, routes.CLICKBOARDING, ANDROID_DEEPLINK_CLICKBOARDING),
    )
    window.location.href = link
  }

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

  if (showWelcomePage) {
    return <WelcomePage close={closeWelcomePage} toAgreed={state.agreeTos} onAgreeTos={handleTOS} />
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Page>
        <Card>
          <Logo>
            <Lock />
          </Logo>
          <Wrapper>
            <Section>
              <SectionTitle>Standard Onboarding</SectionTitle>
              <Heading
                title="Create Password"
                description="Please set your Node UI password. Your password must contain at least 10 characters."
              />
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
              </PasswordInputs>
              <Divider />
              <Heading
                title="Connect your node to mystnodes.com"
                description={
                  <>
                    To manage your node and view statistics on{' '}
                    <Link href="https://mystnodes.com/me" target="_blank">
                      mystnodes.com
                    </Link>
                    , enter your API key obtained from{' '}
                    <Link href="https://mystnodes.com/" target="_blank">
                      mystnodes.com/me
                    </Link>
                    . As a first-time user, you may be eligible for a free node registration.
                  </>
                }
              />
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
              <ButtonRow>
                <StyledButton
                  size="large"
                  rounded
                  loading={loading}
                  label={state.claim ? 'Confirm and Claim' : 'Confirm'}
                />
              </ButtonRow>
            </Section>
            <SectionSeparator />
            <Section>
              <SectionTitleWithŽygisLogic>Quick Onboarding</SectionTitleWithŽygisLogic>
              <Heading
                title={''}
                description={
                  <CenteredDescription>
                    The easy way to set up and start running your node. <br /> It will guide you through the onboarding,
                    node claiming, and password-setting process with just a few clicks of a button.
                  </CenteredDescription>
                }
              />
              <ButtonRow>
                <StyledButton type="button" size="large" rounded label="Start" onClick={getLinkAndRedirect} />
              </ButtonRow>
            </Section>
          </Wrapper>
        </Card>
      </Page>
    </Form>
  )
}
