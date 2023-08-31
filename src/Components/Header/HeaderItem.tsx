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
  position: relative;
  gap: 16px;
  height: 80%;
  flex-shrink: 0;
  padding-right: 40px;
  :not(:nth-last-of-type(2)) {
    border-right: ${`1px solid ${themeCommon.colorGrayBlue}`};
  }
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
  dataTestId?: string
  content: ReactNode
}

export const HeaderItem = ({ title, dataTestId, content, minWidth = 0 }: Props) => {
  return (
    <Item data-test-id={dataTestId} style={{ minWidth: `${minWidth}px` }}>
      {title && <Title>{title}</Title>}
      {content}
    </Item>
  )
}
