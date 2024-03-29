/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo } from 'react'
import Clipboard from 'clipboard'
import toasts from '../../commons/toasts'
import { nanoid } from 'nanoid'
import styled, { css } from 'styled-components'
import { InputCopyToClipboardIcon } from '../Icons/InputIcons'
import { themeCommon } from '../../theme/themeCommon'

interface IconButtonProps {
  $clickable?: boolean
}

const clickableCSS = css`
  :hover {
    border: 1px solid ${themeCommon.colorDarkBlue}5A;
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

const IconButton = styled.div`
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Clickable = styled.div<IconButtonProps>`
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
    <IconButton className={uid} data-clipboard-text={text} onClick={handleOnClick}>
      <Clickable $clickable>
        <InputCopyToClipboardIcon />
      </Clickable>
    </IconButton>
  )
}

export default CopyToClipboardButtonIcon
