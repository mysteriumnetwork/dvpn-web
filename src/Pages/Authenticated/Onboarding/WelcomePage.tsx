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
import zIndexes from '../../../constants/z-indexes'

const Logo = styled(LoginLogo)`
  height: 500px;
  width: 500px;
  @media ${devices.tablet} {
    height: 300px;
    width: 300px;
  }
  @media screen and (max-height: 430px) {
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
    font-size: 60px;
    line-height: 60px;
  }
  @media screen and (max-height: 430px) {
    font-size: 40px;
    line-height: 40px;
  }
\`
`
const Comment = styled.div`
  color: ${({ theme }) => theme.common.colorGrayBlue2};
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
  color: ${({ theme }) => theme.common.colorGrayBlue2};
  @media ${devices.tablet} {
    font-size: 60px;
    line-height: 60px;
  }
  @media screen and (max-height: 430px) {
    font-size: 40px;
    line-height: 40px;
  }
\`
`
const Card = styled.div`
  background-color: ${({ theme }) => theme.common.colorWhite};
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.09);
  border-radius: 30px;
  z-index: ${zIndexes.welcomePageContent};
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
    width: 300px;
    padding: 10px;
  }
  @media screen and (max-height: 430px) {
   height: max-content;
  }
\`
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
const ButtonRow = styled.div`
  margin-top: 20px;
  @media ${devices.tablet} {
    margin-bottom: 20px;
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
  z-index: ${zIndexes.welcomePage};
  align-items: center;
  justify-content: center;
  background-image: url(${Background});
  background-color: ${({ theme }) => theme.common.colorLightBlue};
  @media ${devices.tablet} {
    padding: 30px 0;
    height: 100%;
    width: 100%;
  }
`
interface Props {
  close: () => void
}
export const WelcomePage = ({ close }: Props) => {
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
        </Header>
      </Card>
      <ButtonRow>
        <Button rounded size="large" variant="primary" label="START NODE SETUP" onClick={close} />
      </ButtonRow>
    </Page>
  )
}
