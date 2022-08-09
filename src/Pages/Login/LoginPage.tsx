/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react'
import { tequila } from '../../api/tequila'
import { DEFAULT_USERNAME } from '../../constants/defaults'
import { updateAuthenticatedStore } from '../../redux/app.slice'
import { store } from '../../redux/store'
import styled from 'styled-components'
import { InputGroup } from '../../Components/Inputs/InputGroup'
import { TextField } from '../../Components/Inputs/TextField'
import { Form } from '../../Components/Inputs/Form'
import { Button } from '../../Components/Inputs/Button'
import { toast } from 'react-toastify'
import errors from '../../commons/errors'
import Background from '../../assets/images/onboarding/background.png'
import { ReactComponent as Logo } from '../../assets/images/onboarding/login.svg'
const { api } = tequila

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
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`
const Title = styled.h1`
  font-size: 80px;
  line-height: 80px;
  width: 70%;
  color: ${({ theme }) => theme.common.colorGrayBlue2};
`
const SubTitle = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue2};
`
const PrimaryText = styled.span`
  color: ${({ theme }) => theme.common.colorKey};
  line-height: 88px;
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
const Link = styled.a`
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2em;
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-end;
`
interface Props {
  onSuccess: () => void
}

const LoginPage = ({ onSuccess }: Props) => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePassword = (value: string) => setPassword(value)
  const inputError = error.length > 0
  const handleLogin = async () => {
    try {
      setLoading(true)
      await api.authLogin({
        username: DEFAULT_USERNAME,
        password: password,
      })
      store.dispatch(updateAuthenticatedStore({ authenticated: true, withDefaultCredentials: false }))
      await onSuccess()
    } catch (err: any) {
      toast.error(errors.apiError(err).human())
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Form onSubmit={handleLogin}>
      <Page>
        <Card>
          <Logo />
          <Container>
            <Header>
              <Title>
                <PrimaryText>Welcome</PrimaryText> node runner!
              </Title>
              <SubTitle>Welcome Back! Please enter your NODE UI password.</SubTitle>
            </Header>
            <InputGroup
              title="Password"
              error={error}
              input={<TextField type="password" error={inputError} value={password} onChange={handlePassword} />}
            />
            <Footer>
              <Link href="https://docs.mysterium.network/troubleshooting/forgot-password" target="_blank">
                Forgot password?
              </Link>
            </Footer>
          </Container>
        </Card>
        <ButtonRow>
          <Button type="submit" variant="primary" label="LOGIN" loading={loading} />
        </ButtonRow>
      </Page>
    </Form>
  )
}

export default LoginPage
