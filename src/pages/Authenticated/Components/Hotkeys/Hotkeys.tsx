/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../constants/routes'

export const Hotkeys = () => {
  const navigate = useNavigate()
  const handleKeyPress = useCallback((event: any) => {
    if (event.key === 'F10') {
      event.preventDefault()
      navigate(ROUTES.ADMIN)
      return
    }

    if (event.key === 'F9') {
      event.preventDefault()
      navigate(ROUTES.STORYBOOK)
      return
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return <></>
}
