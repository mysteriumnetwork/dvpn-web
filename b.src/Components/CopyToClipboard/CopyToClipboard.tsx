/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import IconButton from '../IconButton/IconButton'
import Clipboard from 'clipboard'
import toasts from '../../commons/toasts'

interface Props {
  text: string
  noToast?: boolean
}

const CopyToClipboard = ({ text, noToast }: Props) => {
  useEffect(() => {
    const clipboard = new Clipboard('.c2c-btn')
    return () => clipboard.destroy()
  }, [])

  const handleOnClick = () => {
    if (!noToast) {
      toasts.toastSuccess('Copied to clipboard')
    }
  }

  return (
    <div className="c2c-btn" data-clipboard-text={text} onClick={handleOnClick}>
      <IconButton>
        <FileCopyIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

export default CopyToClipboard
