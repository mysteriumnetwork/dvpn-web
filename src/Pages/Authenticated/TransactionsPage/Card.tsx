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
  $flexGrow?: number
  $flexShrink?: number
  $fluid?: boolean
}

const PaddedContent = styled.div<CardProps>`
  padding: 26px 30px 26px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  max-height: 100px;
  width: ${({ $fluid }) => $fluid && '100%'};
  flex-grow: ${({ $flexGrow }) => ($flexGrow ? $flexGrow : 1)};
  flex-shrink: ${({ $flexShrink }) => ($flexShrink ? $flexShrink : 1)};
  background: ${({ theme }) => theme.bgTransactionPageCard};
  box-shadow: ${({ theme }) => theme.bgTransactionPageCardBoxShadow};
  @media ${devices.tablet} {
    width: 100%;
    justify-content: flex-start;
  }
`

interface Props {
  grow?: number
  shrink?: number
  fluid?: boolean
  children?: ReactNode
}

export const Card = ({ children, grow, fluid, shrink }: Props) => {
  return (
    <PaddedContent $fluid={fluid} $flexGrow={grow} $flexShrink={shrink}>
      {children}
    </PaddedContent>
  )
}
