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
import styled from 'styled-components'
import { InputGroup } from '../../Components/Inputs/InputGroup'
import { TextField } from '../../Components/Inputs/TextField'
import { Form } from '../../Components/Inputs/Form'
import { Button } from '../../Components/Inputs/Button'
import { toast } from 'react-toastify'
import errors from '../../commons/errors'
import Background from '../../assets/images/onboarding/background.png'
import { ReactComponent as LoginLogo } from '../../assets/images/onboarding/login.svg'
import { devices } from '../../theme/themes'
import { loadAppStateAfterAuthenticationAsync } from '../../redux/app.async.actions'

const { api } = tequila

const Logo = styled(LoginLogo)`
  height: 500px;
  width: 500px;
  @media ${devices.tablet} {
    height: 300px;
    width: 300px;
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
  gap: 0px;
  margin-bottom: 40px;
  @media ${devices.tablet} {
    align-self: flex-start;
  }
`
const SubTitle = styled.h1`
  font-size: 80px;
  margin-top: 0;
  line-height: 80px;
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  @media ${devices.tablet} {
    font-size: 60px;
    line-height: 60px;
  }
`
const Comment = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  margin-top: 10px;
`
const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorKey};
  line-height: 88px;
  font-size: 80px;
  @media ${devices.tablet} {
    text-align: left;
    font-size: 60px;
    line-height: 60px;
  }
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
    height: 700px;
    width: 300px;
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
  @media ${devices.tablet} {
    align-items: flex-start;
  }
`
interface Props {
  onSuccess?: () => void
}

const LoginPage = ({ onSuccess = () => {} }: Props) => {
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
      await loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
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
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <Container>
            <Header>
              <Title>Welcome</Title>
              <SubTitle>node runner!</SubTitle>
              <Comment>Welcome Back! Please enter your Node UI password.</Comment>
            </Header>

            <InputGroup
              title="Password"
              error={error}
              fluid
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
          <Button rounded size="large" type="submit" variant="primary" label="LOGIN" loading={loading} />
        </ButtonRow>
      </Page>
    </Form>
  )
}

export default LoginPage
