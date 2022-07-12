/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useMemo } from 'react'
import Clipboard from 'clipboard'
import toasts from '../../commons/toasts'
import { nanoid } from 'nanoid'
import styled, { css } from 'styled-components'
import themes from '../../commons/themes'
import { InputCopyToClipboardIcon } from '../Icons/InputIcons'

interface IconButtonProps {
  $clickable?: boolean
}

const clickableCSS = css`
  :hover {
    border: 1px solid ${themes.common.colorDarkBlue}5A;
    border-radius: 100px;
  }

  :active {
    width: 18px;
    height: 18px;
  }

  :hover {
    cursor: pointer;
  }
`

const IconButton = styled.div<IconButtonProps>`
  width: 20px;
  height: 20px;

  ${({ $clickable }) => $clickable && clickableCSS}
`

interface Props {
  text: string
  noToast?: boolean
}

const CopyToClipboardButtonIcon = ({ text, noToast }: Props) => {
  const uid = useMemo(() => nanoid(), [])

  useEffect(() => {
    const clipboard = new Clipboard(`.${uid}`)
    return () => clipboard.destroy()
  }, [])

  const handleOnClick = () => {
    if (!noToast) {
      toasts.toastSuccess('Copied to clipboard')
    }
  }

  return (
    <IconButton $clickable className={uid} data-clipboard-text={text} onClick={handleOnClick}>
      <InputCopyToClipboardIcon />
    </IconButton>
  )
}

export default CopyToClipboardButtonIcon
