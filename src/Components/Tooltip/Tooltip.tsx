/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Tippy from '@tippyjs/react/headless'
import * as React from 'react'
import { InfoIcon, QuestionIcon } from '../Icons/Icons'
import styled from 'styled-components'
import { useId } from 'react'

const StyledTooltip = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.tooltip.background};
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  color: ${({ theme }) => theme.tooltip.textColor};
  padding: 10px;
  border-radius: 10px;

  font-weight: 400;
  line-height: 14px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  max-width: 300px;
`

type Variant = '!' | '?'

interface Props {
  variant?: Variant
  interactive?: boolean
  children?: React.ReactElement
  content?: React.ReactNode
}

export const Tooltip = ({ children, content, variant = '!', interactive = true }: Props) => {
  const id = useId()
  if (!content) {
    return <>{children}</>
  }
  return (
    <Tippy
      placement="top"
      interactive={interactive}
      render={(attributes) => (
        <StyledTooltip id={`tooltip-${id}`} role="tooltip" tabIndex={-1} {...attributes}>
          {content}
        </StyledTooltip>
      )}
    >
      {children ? children : resolveVariant(variant)}
    </Tippy>
  )
}

const resolveVariant = (variant: Variant) => {
  switch (variant) {
    case '!':
      return <InfoIcon />
    case '?':
      return <QuestionIcon />
    default:
      return <InfoIcon />
  }
}
