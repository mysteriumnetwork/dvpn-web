/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { IconButton } from '../Inputs/IconButton'
import { ReactNode } from 'react'
import zIndexes from '../../constants/z-indexes'

interface TransitionProps {
  $expanded: boolean
  $ignoreOverlay?: boolean
}
const Title = styled.div``
const Container = styled.div<TransitionProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $expanded }) => ($expanded ? '40px' : 0)};
  padding-right: ${({ $expanded }) => ($expanded ? '20px' : 0)};
  z-index: ${({ $ignoreOverlay }) => ($ignoreOverlay ? zIndexes.overlay + 1 : 0)};
  transition: gap 0.3s, padding-right 0.3s, max-width 0.3s;
  ${Title} {
    text-decoration: none;
    color: ${({ theme }) => theme.common.colorWhite};
    font-size: ${({ theme }) => theme.common.fontSizeBig};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    max-width: ${({ $expanded }) => ($expanded ? '200px' : 0)};
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    transition: opacity 0.3s, max-width 0.3s;
  }
`

interface Props {
  title: string
  expanded: boolean
  icon: ReactNode
  onClick: () => void
  ignoreOverlay?: boolean
}

export const ExpandableControl = ({ expanded, icon, onClick, title, ignoreOverlay }: Props) => {
  return (
    <Container $expanded={expanded} $ignoreOverlay={ignoreOverlay} onClick={onClick}>
      <IconButton icon={icon} />
      <Title>{title}</Title>
    </Container>
  )
}
