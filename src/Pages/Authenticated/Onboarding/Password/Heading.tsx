/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'
import React, { ReactNode } from 'react'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${devices.tablet} {
    gap: 5px;
  }
`

const Title = styled.h1<{ $centered?: boolean }>`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
  margin-bottom: 10px;
  align-self: ${({ $centered }) => ($centered ? 'center' : 'unset')};

  @media ${devices.tablet} {
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    align-self: unset;
  }
`

const Comment = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  margin-bottom: 10px;
`

type Props = {
  title?: string
  titleCenter?: boolean
  description: ReactNode
}

export const Heading = ({ title, description, titleCenter }: Props) => {
  return (
    <Header>
      {title && <Title $centered={titleCenter}>{title}</Title>}
      <Comment>{description}</Comment>
    </Header>
  )
}
