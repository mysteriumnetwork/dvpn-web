/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import MobileMenu from '../Menu/MobileMenu'
import LogoWithTitle from '../../../components/Logo/LogoWithTitle'
import Container from '../../../components/Containers/Container'
import { Notifications } from '../Notifications/Notifications'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'

export const Header = () => {
  const auth = useAppSelector(selectors.auth)

  return (
    <Container className="bg-white fixed w-full z-50 border-b border-white-25">
      <menu className="relative w-full py-5 flex items-center justify-between my-0">
        <LogoWithTitle />
        {auth.authenticated && (
          <div className="w-fit flex items-center gap-2">
            <Notifications />
            <div className="md:hidden bg-white-175 w-px min-w-px h-4" />
            <MobileMenu className="md:hidden" />
          </div>
        )}
      </menu>
    </Container>
  )
}

export default Header
