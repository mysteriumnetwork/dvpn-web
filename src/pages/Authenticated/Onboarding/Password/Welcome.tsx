/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'
import React from 'react'
import { LogoDarkIcon } from '../../../../components/Icons/Icons'

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

const SubTitle = styled.h1`
  font-size: 30px;
  margin-top: 0;
  color: ${({ theme }) => theme.text.colorMain};
  text-align: center;
  @media ${devices.tablet} {
    font-size: 26px;
  }
`

const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorKey};

  font-size: 40px;
  text-align: center;
  @media ${devices.tablet} {
    font-size: 30px;
  }
  @media ${devices.mobileS} {
    font-size: 20px;
  }
`
const Comment = styled.div`
  color: ${({ theme }) => theme.common.colorKeyLight};
  margin-top: 10px;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
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
      <LogoDarkIcon className="size-12 md:size-16" />
      <Group>
        <Title>Welcome</Title>
        <SubTitle>node runner!</SubTitle>
        <Comment>Let's get you up and running</Comment>
      </Group>
    </Container>
  )
}
