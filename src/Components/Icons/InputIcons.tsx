/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import { ReactComponent as InputEmailSvg } from '../../assets/images/input/email.svg'
import { ReactComponent as InputCopyToClipboardSvg } from '../../assets/images/input/copy-to-clipboard.svg'
import { ReactComponent as InputLockSvg } from '../../assets/images/input/lock.svg'

export type InputIconVariant = 'normal' | 'disabled' | 'error'

interface InputIconProps {
  $noCircle?: boolean
  $variant?: InputIconVariant
}

const resolveCSS = (variant?: InputIconVariant) => {
  switch (variant) {
    case 'error':
      return errorCSS
    case 'disabled':
      return disabledCSS
    default:
      return normalCSS
  }
}

const normalCSS = css`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fill};
  }
  path {
    stroke: ${({ theme }) => theme.inputIcon.stroke};
  }
`

const disabledCSS = css`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fillDisabled};
  }
  path {
    stroke: ${({ theme }) => theme.inputIcon.strokeDisabled};
  }
`

const errorCSS = css`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fillError};
  }
  path {
    stroke: ${({ theme }) => theme.inputIcon.strokeError};
  }
`

const commonCSS = `
  display: flex;
  width: 100%;
  height: 100%;
`

export const InputEmailIcon = styled(InputEmailSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`

export const InputCopyToClipboardIcon = styled(InputCopyToClipboardSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`

export const InputLockIcon = styled(InputLockSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`
