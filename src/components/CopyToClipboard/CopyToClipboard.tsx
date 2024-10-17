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
import { ReactComponent as CopySVG } from '../../assets/images/copy-to-clipboard.svg'
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'

interface Props {
  text: string
  noToast?: boolean
}

const Icon = styled(CopySVG)`
  :hover {
    circle {
      fill: ${themeCommon.colorKeyLight}1A;
    }
  }

  :active {
    circle {
      fill: ${themeCommon.colorKeyLight}FF;
    }
  }
`

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CopyToClipboard = ({ text, noToast }: Props) => {
  const uid = useMemo(() => nanoid(), [])

  useEffect(() => {
    const clipboard = new Clipboard(`.clipboard-${uid}`)
    return () => clipboard.destroy()
  }, [])

  const handleOnClick = () => {
    if (!noToast) {
      toasts.toastSuccess('Copied to clipboard')
    }
  }

  return (
    <StyledButton className={uid} data-clipboard-text={text} onClick={handleOnClick}>
      <Icon />
    </StyledButton>
  )
}

export default CopyToClipboard
