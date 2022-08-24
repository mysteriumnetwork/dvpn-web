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
export type Brushes = 'fill' | 'stroke'

interface InputIconProps {
  $noCircle?: boolean
  $variant?: InputIconVariant
  $brushes?: Brushes[]
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

const normalCSS = css<InputIconProps>`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fill};
  }
  #ico-fg {
    ${({ $brushes, theme }) => $brushes?.map((b) => `${b}: ${theme.inputIcon.stroke};`).join('\n')}
  }
`

const disabledCSS = css<InputIconProps>`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fillDisabled};
  }
  #ico-fg {
    ${({ $brushes, theme }) => $brushes?.map((b) => `${b}: ${theme.inputIcon.strokeDisabled};`).join('\n')}
  }
`

const errorCSS = css<InputIconProps>`
  circle {
    fill: ${({ theme }) => theme.inputIcon.fillError};
  }
  #ico-fg {
    ${({ $brushes, theme }) => $brushes?.map((b) => `${b}: ${theme.inputIcon.strokeError};`).join('\n')}
  }
`

const commonCSS = `
  display: flex;
  width: 100%;
  height: 100%;
`

export const InputEmailIconInit = styled(InputEmailSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`

export const InputEmailIcon = (props: InputIconProps) => <InputEmailIconInit $brushes={['stroke']} {...props} />

export const InputCopyToClipboardIconInit = styled(InputCopyToClipboardSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`
export const InputCopyToClipboardIcon = (props: InputIconProps) => (
  <InputCopyToClipboardIconInit $brushes={['fill']} {...props} />
)

export const InputLockIconInit = styled(InputLockSvg)<InputIconProps>`
  ${({ $variant }) => resolveCSS($variant)};
  ${commonCSS};
`
export const InputLockIcon = (props: InputIconProps) => <InputLockIconInit $brushes={['stroke']} {...props} />
