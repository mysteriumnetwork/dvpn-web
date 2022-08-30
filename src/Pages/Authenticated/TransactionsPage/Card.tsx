/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { devices } from '../../../theme/themes'

const Content = styled.div`
  padding: 26px 30px 26px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  max-height: 100px;
  background: ${({ theme }) => theme.bgTransactionPageCard};
  box-shadow: ${({ theme }) => theme.bgTransactionPageCardBoxShadow};
  flex-grow: 1;
  flex-shrink: 0;
  @media ${devices.tablet} {
    width: 100%;
    align-items: stretch;
    justify-content: stretch;
  }
`

interface Props {
  children?: ReactNode
}

export const Card = ({ children }: Props) => {
  return <Content>{children}</Content>
}
