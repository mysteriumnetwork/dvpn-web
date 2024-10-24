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
import { useState } from 'react'
import { tequila } from '../../api/tequila'
import { DEFAULT_USERNAME } from '../../constants/defaults'
import styled from 'styled-components'
import { InputGroup } from '../../components/Inputs/InputGroup'
import { TextField } from '../../components/Inputs/TextField'
import { Form } from '../../components/Inputs/Form'
import Button from '../../components/Buttons/Button'
import errors from '../../commons/errors'
import { ReactComponent as LoginLogo } from '../../assets/images/onboarding/login.svg'
import { devices } from '../../theme/themes'
import complexActions from '../../redux/complex.actions'
import { MystnodesSSO } from './MystnodesSSO'
import { DOCS_FORGOT_PASSWORD } from '../../constants/urls'

const { api } = tequila

const Logo = styled(LoginLogo)`
  height: 500px;
  width: 500px;
  @media ${devices.tablet} {
    height: 300px;
    width: 300px;
  }
  @media ${devices.mobileS} {
    display: none;
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
  background-color: ${({ theme }) => theme.onboarding.bgOverlay};
  @media ${devices.tablet} {
    padding-top: 30px;
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 40px;
  @media ${devices.tablet} {
    align-self: flex-start;
  }
`
const SubTitle = styled.h1`
  font-size: 80px;
  margin-top: 0;
  line-height: 80px;
  color: ${({ theme }) => theme.text.colorMain};
  @media ${devices.tablet} {
    font-size: 60px;
    line-height: 60px;
  }
  @media ${devices.mobileS} {
    font-size: 40px;
    line-height: 40px;
  }
`
const Comment = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
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
  @media ${devices.mobileS} {
    font-size: 40px;
    line-height: 40px;
  }
`
const Card = styled.div`
  background-color: ${({ theme }) => theme.onboarding.bgCard};
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
    height: 710px;
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

const Controls = styled.div`
  margin-top: 20px;
  gap: 16px;
  display: flex;
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
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;

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
      await complexActions.loadAppStateAfterAuthenticationAsync({ isDefaultPassword: false })
    } catch (err: any) {
      errors.parseToastError(err)
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
              <Link href={DOCS_FORGOT_PASSWORD} target="_blank">
                Forgot password?
              </Link>
            </Footer>
          </Container>
        </Card>
        <Controls>
          <Button type="submit" variant="primary" label="LOGIN" loading={loading} />
          <MystnodesSSO />
        </Controls>
      </Page>
    </Form>
  )
}

export default LoginPage
