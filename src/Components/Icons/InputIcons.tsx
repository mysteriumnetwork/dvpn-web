/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ReactComponent as InputEmailSvg } from '../../assets/images/input/email.svg'
import { ReactComponent as InputCopyToClipboardSvg } from '../../assets/images/input/copy-to-clipboard.svg'
import { ReactComponent as InputLockSvg } from '../../assets/images/input/lock.svg'

interface InputIconProps {
  $noCircle?: boolean
}

export const InputEmailIcon = styled(InputEmailSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`

export const InputCopyToClipboardIcon = styled(InputCopyToClipboardSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`

export const InputLockIcon = styled(InputLockSvg)<InputIconProps>`
  display: flex;
  width: 100%;
  height: 100%;
  circle {
    opacity: ${({ $noCircle }) => $noCircle && 0};
  }
`
