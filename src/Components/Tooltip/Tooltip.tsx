/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Floating } from '../Floating/Floating'
import styled from 'styled-components'
import zIndexes from '../../constants/z-indexes'
import { ReactNode } from 'react'
import { Placement } from '@floating-ui/react-dom-interactions'

interface TooltipProps {
  children: JSX.Element
  content: ReactNode
  placement?: Placement
  disabled?: boolean
  delay?: number | { open?: number; close?: number }
}
const StyledTooltip = styled(Floating.Base)`
  position: relative;
  background-color: ${({ theme }) => theme.tooltip.bg};
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  color: ${({ theme }) => theme.tooltip.textColor};
  padding: 10px;
  border-radius: 10px;
  font-weight: 400;
  line-height: 14px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  width: max-content;
  z-index: ${zIndexes.menuTooltip};
`
export const Tooltip = ({ children, content, delay, disabled, placement = 'bottom' }: TooltipProps) => {
  const state = Floating.useFloatingState({ id: content, delay: delay, placement: placement })
  return (
    <>
      <Floating.Anchor state={state} asChild>
        {children}
      </Floating.Anchor>
      {!disabled && (
        <StyledTooltip data-test-id="Tooltip" state={state}>
          {content}
        </StyledTooltip>
      )}
    </>
  )
}
