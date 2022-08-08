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
import { ReactComponent as QuestionMark } from '../../../assets/images/question.svg'
const { api } = tequila

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
  background-color: ${({ theme }) => theme.common.colorLightBlue};
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
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
  margin-bottom: 100px;
`
const Link = styled.a`
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2em;
`
const Card = styled.div`
  background-color: ${({ theme }) => theme.common.colorWhite};
  border-radius: 30px;
  height: 550px;
  gap: 100px;
  width: 60%;
  display: flex;
  align-items: center;
  padding: 40px;
  justify-content: space-evenly;
`
const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
`
const ButtonRow = styled.div`
  margin-top: 20px;
`
const useQuery = () => {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

interface State {
  password: string
  confirmPassword: string
  claim: boolean
  tos: boolean
  mmnApiKey: string
}

const INITIAL_STATE: State = {
  password: '',
  confirmPassword: '',
  claim: false,
  tos: false,
  mmnApiKey: '',
}

export const PasswordPage = () => {
  const query = useQuery()
  const mmnApiKey = query.get('mmnApiKey')

  const [state, setState] = useState({
    ...INITIAL_STATE,
    claim: mmnApiKey !== null,
    mmnApiKey: mmnApiKey !== null ? mmnApiKey : '',
  })
  const [loading, setLoading] = useState(false)

  const handlePassword = (value: string) => setState((p) => ({ ...p, password: value }))
  const handleConfirmPassword = (value: string) => setState((p) => ({ ...p, confirmPassword: value }))
  const handleTOS = (value: boolean) => setState((p) => ({ ...p, tos: value }))
  const handleMmnApiKey = (value: string) => setState((p) => ({ ...p, mmnApiKey: value }))
  const handleClaim = (value: string) => {
    handleMmnApiKey(value)
    if (value.length === 40) {
      setState((p) => ({ ...p, claim: true }))
    }
    if (value.length !== 40) {
      setState((p) => ({ ...p, claim: false }))
    }
  }
  const handleSubmit = async () => {
    const validationResult = validatePassword(state.password, state.confirmPassword)
    if (!validationResult.success) {
      toasts.toastError(validationResult.errorMessage)
      return
    }

    try {
      setLoading(true)
      if (state.claim) {
        await api.setMMNApiKey(state.mmnApiKey)
      }

      await api.authChangePassword({
        username: DEFAULT_USERNAME,
        oldPassword: DEFAULT_PASSWORD,
        newPassword: state.password,
      })
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
      if (state.tos) {
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
    <Form onSubmit={handleSubmit}>
      <Page>
        <Card>
          <Lock />
          <Container>
            <Header>
              <h1>Create Password</h1>
              <p>Please set your Node UI password. Your password must contain at least 10 characters.</p>
            </Header>
            <InputContainer>
              <InputGroup
                title="Password"
                fluid={true}
                input={<TextField type="password" value={state.password} onChange={handlePassword} />}
              />
              <InputGroup
                title="Confirm password"
                fluid
                input={<TextField type="password" value={state.confirmPassword} onChange={handleConfirmPassword} />}
              />
              <span>
                <Checkbox checked={state.tos} onChange={handleTOS} /> I agree to
                <Link href="https://mystnodes.com/terms" target="_blank">
                  Terms and Conditions
                </Link>
              </span>
            </InputContainer>
            <Footer>
              <h2>
                Connect your node to mystnodes.com <QuestionMark />
              </h2>
              <InputGroup fluid input={<TextField value={state.mmnApiKey} onChange={handleClaim} />} />
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
  )
}
