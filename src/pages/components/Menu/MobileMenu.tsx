/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import Menu from './Menu'
import DotsToggleButton from '../../../components/Buttons/DotsToggleButton'
import { useScrollLock } from '../../../commons/hooks'
import { useStores } from '../../../mobx/store'

type Props = {
  readonly className?: string
}

export const MobileMenu = observer(({ className }: Props) => {
  const { pathname } = useLocation()
  const { menuStore } = useStores()
  useScrollLock(menuStore.isOpen)

  useEffect(() => {
    menuStore.setIsOpen(false)
  }, [pathname])

  return (
    <nav className={className}>
      <DotsToggleButton isOpen={menuStore.isOpen} onClick={() => menuStore.setIsOpen(!menuStore.isOpen)} />
      <div
        className={twMerge(
          'flex flex-col justify-between bg-white w-full transition-[margin-left] ease-in-out duration-500',
          'fixed top-[76px] bottom-0 left-0 z-[100]',
          menuStore.isOpen ? 'ml-0' : '-ml-[100%]',
        )}
      >
        <Menu className="pt-20 pb-8 gap-2.5 w-fit" />
      </div>
    </nav>
  )
})

export default MobileMenu
