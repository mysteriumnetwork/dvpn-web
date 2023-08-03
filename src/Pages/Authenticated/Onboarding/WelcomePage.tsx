/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Background from '../../../assets/images/onboarding/background.png'
import styled from 'styled-components'
import { devices } from '../../../theme/themes'
import { ReactComponent as LoginLogo } from '../../../assets/images/onboarding/login.svg'
import { Button } from '../../../Components/Inputs/Button'
import React, { useState } from 'react'
import { Checkbox } from '../../../Components/Inputs/Checkbox'
import { TOSModal } from '../Components/TOSModal/TOSModal'
import toasts from '../../../commons/toasts'

const Logo = styled(LoginLogo)`
  height: 500px;
  width: 500px;
  @media ${devices.tablet} {
    height: 250px;
    width: 250px;
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

const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorKey};
  line-height: 88px;
  font-size: 80px;
  @media ${devices.tablet} {
    font-size: 50px;
    line-height: 60px;
  }
  @media ${devices.mobileS} {
    font-size: 40px;
    line-height: 40px;
  }
`

const Comment = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  margin-top: 20px;
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeBig};
  }
`
const SubTitle = styled.h1`
  font-size: 80px;
  margin-top: 0;
  line-height: 80px;
  color: ${({ theme }) => theme.text.colorMain};
  @media ${devices.tablet} {
    font-size: 40px;
    line-height: 60px;
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.onboarding.bgCard};
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
    height: 600px;
    width: 90%;
    padding: 10px;
    margin-top: 20px;
  }
  @media ${devices.mobileS} {
    height: max-content;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 40px;
  @media ${devices.tablet} {
    align-self: flex-start;
    padding: 10px;
  }
`

const ButtonRow = styled.div`
  margin-top: 20px;
  @media ${devices.tablet} {
    padding-bottom: 20px;
  }
`

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  background-image: url(${Background});
  background-color: ${({ theme }) => theme.onboarding.bgOverlay};
  @media ${devices.tablet} {
    height: 100%;
    width: 100%;
    justify-content: unset;
  }
`

const LinkButton = styled.div`
  color: ${({ theme }) => theme.common.colorKey};
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.2em;
  cursor: pointer;
`

const TOS = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 20px;

  @media ${devices.tablet} {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`

interface Props {
  close: () => void
  onAgreeTos: (b: boolean) => void
  toAgreed: boolean
}

export const WelcomePage = ({ close, onAgreeTos, toAgreed }: Props) => {
  const [showTos, setShowTos] = useState(false)

  const onClose = () => {
    if (!toAgreed) {
      toasts.toastError('You must agree to Terms and Conditions to proceed')
      return
    }
    close()
  }

  return (
    <Page>
      <Card>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Header>
          <Title>Welcome</Title>
          <SubTitle>node runner!</SubTitle>
          <Comment>Let's get you up and running</Comment>
          <TOS>
            <Checkbox checked={toAgreed} onChange={onAgreeTos} /> I agree to
            <LinkButton onClick={() => setShowTos(true)}>Terms and Conditions</LinkButton>
          </TOS>
        </Header>
      </Card>
      <ButtonRow>
        <Button rounded size="large" variant="primary" label="START NODE SETUP" onClick={onClose} />
      </ButtonRow>
      <TOSModal show={showTos} hideAgree onClose={() => setShowTos(false)} onCloseLabel="Close" />
    </Page>
  )
}
