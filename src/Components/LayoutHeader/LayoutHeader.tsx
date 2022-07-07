/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes from '../../commons/themes'
import React from 'react'

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  min-width: 200px;
  color: ${themes.current().colorDarkBlue};
`

interface Props {
  logo: React.ReactNode
  name?: string
}

const LayoutHeader = ({ logo, name }: Props) => {
  return (
    <Content>
      <Logo>{logo}</Logo>
      <PageName>{name}</PageName>
    </Content>
  )
}

export default LayoutHeader
