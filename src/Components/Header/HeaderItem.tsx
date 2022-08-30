/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'
import { ReactNode } from 'react'

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  @media ${devices.tablet} {
    margin-bottom: 25px;
  }
`

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  @media ${devices.tablet} {
    color: ${themeCommon.colorWhite};
  }
`

interface Props {
  minWidth?: number
  title?: string
  content: ReactNode
}

export const HeaderItem = ({ title, content, minWidth = 0 }: Props) => {
  return (
    <Item style={{ minWidth: `${minWidth}px` }}>
      {title && <Title>{title}</Title>}
      {content}
    </Item>
  )
}
