/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'

interface CardProps {
  $flexGrow?: number
  $fluid?: boolean
}

const PaddedContent = styled.div<CardProps>`
  padding: 26px 30px 26px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  min-width: 300px;
  max-height: 100px;
  width: ${({ $fluid }) => $fluid && '100%'};
  flex-grow: ${({ $flexGrow }) => ($flexGrow ? $flexGrow : 1)};
  background: ${({ theme }) => theme.bgTransactionPageCard};
  box-shadow: ${({ theme }) => theme.bgTransactionPageCardBoxShadow};
`

interface Props {
  grow?: number
  fluid?: boolean
  children?: ReactNode
}

export const Card = ({ children, grow, fluid }: Props) => {
  return (
    <PaddedContent $fluid={fluid} $flexGrow={grow}>
      {children}
    </PaddedContent>
  )
}
