/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styled, { css } from 'styled-components'
import { ReactNode } from 'react'
import { themeCommon } from '../../theme/themeCommon'

interface IconButtonProps {
  $clickable?: boolean
}

const clickableCSS = css`
  :hover {
    border: 1px solid ${themeCommon.colorDarkBlue}AA;
    border-radius: 100px;
  }

  :active {
    width: 18px;
    height: 18px;
  }
`

const IconButton = styled.div<IconButtonProps>`
  width: 20px;
  height: 20px;

  ${({ $clickable }) => $clickable && clickableCSS}
`

interface Props {
  id?: string
  icon: ReactNode
  onIconClick?: () => void
}

export const InputIconButton = ({ id, icon, onIconClick }: Props) => {
  return (
    <IconButton id={id} data-clipboard-text={id} $clickable={onIconClick !== undefined}>
      {icon}
    </IconButton>
  )
}
