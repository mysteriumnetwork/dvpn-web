/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Navigation from './Navigation/Navigation'
import { ReactElement, useState } from 'react'
import { MobileMenu } from './Navigation/MobileMenu'
import styled from 'styled-components'
import { Onboarding } from './Onboarding/Onboarding'

const Page = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100vh;
`

const Content = styled.div`
  background: ${({ theme }) => theme.bgNavigation};
  height: 100%;
  width: 100%;
  display: flex;
`

interface Props {
  content?: ReactElement
}

const WithNavigation = ({ content }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const handleMobileMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <Page>
      <Navigation openMenu={handleMobileMenu} />
      <Content>{content}</Content>
      <Onboarding />
      <MobileMenu show={showMenu} closeMenu={handleMobileMenu} />
    </Page>
  )
}

export default WithNavigation
