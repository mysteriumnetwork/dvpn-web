/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import React from 'react'
import { devices } from '../../theme/themes'

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media ${devices.tablet} {
    margin-bottom: 20px;
    margin-left: 25px;
    margin-right: 25px;
    justify-content: space-between;
  }
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const Logo = styled.div`
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
`

const PageName = styled.div`
  font-style: normal;
  font-size: 20px;
  margin-left: 25px;
  font-weight: 500;
  max-width: 200px;
  min-width: 100px;
  color: ${({ theme }) => theme.text.colorMain};
`

interface Props {
  logo: React.ReactNode
  name?: string
  children?: React.ReactNode
}

const LayoutHeader = ({ logo, name, children }: Props) => {
  return (
    <Content>
      <Container>
        <Logo>{logo}</Logo>
        <PageName>{name}</PageName>
      </Container>
      {children}
    </Content>
  )
}

export default LayoutHeader
