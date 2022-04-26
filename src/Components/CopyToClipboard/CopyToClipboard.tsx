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

interface Props {
  text: string
}

const CopyToClipboard = ({ text }: Props) => {
  useEffect(() => {
    const clipboard = new Clipboard('.c2c-btn')
    return () => clipboard.destroy()
  }, [])

  return (
    <div className="c2c-btn" data-clipboard-text={text}>
      <IconButton>
        <FileCopyIcon fontSize="small" />
      </IconButton>
    </div>
  )
}

export default CopyToClipboard
