/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode, useCallback, useEffect } from 'react'
import { ADMIN, SANDBOX } from '../../../../constants/routes'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export const Hotkeys = ({ children }: Props) => {
  const navigate = useNavigate()

  const handleKeyPress = useCallback((event: any) => {
    if (event.key === 'F10') {
      navigate(ADMIN)
      return
    }

    if (event.key === 'F9') {
      navigate(SANDBOX)
      return
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
