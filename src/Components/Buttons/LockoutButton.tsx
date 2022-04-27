/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MouseEventHandler, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { lockouts } from '../../commons/lockout'
import page from '../../commons/page'
import Button from './Button'
import { LockoutButtonProps } from './types'

export const LockoutButton = ({
  id,
  refreshPage = false,
  lockoutSeconds = 5,
  onClick,
  lockoutAfterOnClick = false,
  ...rest
}: LockoutButtonProps) => {
  const settings = useSelector(lockouts.selector(id)) || { lockoutUntil: 0 }
  const [isLockedOut, setIsLockedOut] = useState<boolean>(true)

  useEffect(() => {
    setIsLockedOut(settings.lockoutUntil > Date.now())
    const interval = setInterval(() => {
      setIsLockedOut(settings.lockoutUntil > Date.now())
    }, 500)
    return () => clearInterval(interval)
  }, [settings.lockoutUntil])

  const wrappedOnClick: MouseEventHandler = (e) => {
    if (onClick) {
      onClick(e)
    }

    if (lockoutAfterOnClick) {
      lockouts.lock({ id, seconds: lockoutSeconds })

      if (refreshPage) {
        page.refreshPage(lockoutSeconds)
      }
    }
  }

  return <Button {...rest} isLoading={isLockedOut} disabled={isLockedOut} onClick={wrappedOnClick} />
}
