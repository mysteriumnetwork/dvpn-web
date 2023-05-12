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
import { alphaToHex, themeCommon } from '../../theme/themeCommon'

interface TransitionProps {
  $expanded: boolean
  $ignoreOverlay?: boolean
  $border?: boolean
}
const Title = styled.div``
const Container = styled.div<TransitionProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${({ $border }) => $border && `10px`};
  border-top: ${({ $border }) => $border && `1px dashed ${themeCommon.colorWhite + alphaToHex(0.2)}`};
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: ${({ $expanded }) => ($expanded ? '40px' : 0)};
  padding-right: ${({ $expanded }) => ($expanded ? '60px' : 0)};
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
  border?: boolean
  icon: ReactNode
  onClick: () => void
  ignoreOverlay?: boolean
}

export const ExpandableControl = ({ expanded, icon, onClick, title, ignoreOverlay, border }: Props) => {
  return (
    <Container $expanded={expanded} $ignoreOverlay={ignoreOverlay} onClick={onClick} $border={border}>
      <IconButton icon={icon} />
      <Title>{title}</Title>
    </Container>
  )
}
