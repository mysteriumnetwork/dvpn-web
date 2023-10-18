/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'
import React from 'react'
import { ReactComponent as LoginLogo } from '../../../../assets/images/onboarding/logo.svg'

const LogoContainer = styled.div`
  position: relative;
  width: 180px;
  height: 100px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${devices.tablet} {
    align-self: center;
  }

  @media ${devices.mobileS} {
    display: none;
  }
`
const Logo = styled(LoginLogo)`
  position: absolute;
  right: -35%;
  top: -44%;
  @media ${devices.mobileS} {
    display: none;
  }
`

const SubTitle = styled.h1`
  font-size: 50px;
  margin-top: 0;
  line-height: 30px;
  color: ${({ theme }) => theme.text.colorMain};
  @media ${devices.tablet} {
    font-size: 40px;
    line-height: 60px;
  }
`

const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorKey};
  line-height: 80px;
  font-size: 60px;
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
  color: ${({ theme }) => theme.common.colorKeyLight};
  margin-top: 20px;
  font-size: 27px;
  line-height: 40px;
  font-weight: 400;
  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeBig};
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
`

export const Welcome = () => {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>

      <Group>
        <Title>Welcome</Title>
        <SubTitle>node runner!</SubTitle>
        <Comment>Let's get you up and running</Comment>
      </Group>
    </Container>
  )
}
