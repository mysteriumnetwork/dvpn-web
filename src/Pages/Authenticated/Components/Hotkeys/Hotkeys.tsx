/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect } from 'react'
import { VERSION_MANAGEMENT } from '../../../../constants/routes'
import { useHistory } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export const Hotkeys = ({ children }: Props) => {
  const history = useHistory()

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'F10' && history.location.pathname !== VERSION_MANAGEMENT) {
      history.push(VERSION_MANAGEMENT)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return <>{children}</>
}
