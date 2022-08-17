/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { devices } from '../../../theme/themes'

interface CardProps {
  $scale?: boolean
  $fluid?: boolean
}

const PaddedContent = styled.div<CardProps>`
  padding: 26px 30px 26px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  max-height: 100px;
  flex-grow: ${({ $scale }) => $scale && 1};
  flex-shrink: ${({ $scale }) => $scale && 1};
  background: ${({ theme }) => theme.bgTransactionPageCard};
  box-shadow: ${({ theme }) => theme.bgTransactionPageCardBoxShadow};
  @media ${devices.tablet} {
    width: 100%;
    align-items: stretch;
    justify-content: stretch;
  }
`

interface Props {
  scale?: boolean
  fluid?: boolean
  children?: ReactNode
}

export const Card = ({ children, scale, fluid }: Props) => {
  return (
    <PaddedContent $fluid={fluid} $scale={scale}>
      {children}
    </PaddedContent>
  )
}
