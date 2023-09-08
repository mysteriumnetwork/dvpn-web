/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { IconButton } from '../../../Components/Inputs/IconButton'
import { ReactComponent as Burger } from '../../../assets/images/input/burger.svg'
import { Link } from 'react-router-dom'
import { Notifications } from '../Components/Notifications/Notifications'
import { Profile } from '../Components/Profile/Profile'
import { DASHBOARD } from '../../../constants/routes'
import { useState } from 'react'
import { ReactComponent as LogoDark } from '../../../assets/images/navigation/logo_dark.svg'
import { ReactComponent as LogoLight } from '../../../assets/images/navigation/logo_light.svg'
import { useAppSelector } from '../../../commons/hooks'
import { MobileMenu } from './MobileMenu'
import zIndexes from '../../../constants/z-indexes'
import remoteStorage from '../../../commons/remoteStorage'
import { UI_THEME_KEY } from '../../../constants/remote-storage.keys'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  height: 100px;
  top: 0;
  z-index: ${zIndexes.mobileNavigation};
  padding: 0 10px 0 10px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.navigation.bg};
`
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const LogoLink = styled(Link)`
  margin-top: -30px;
  margin-right: 20px;
`
const InputGroupLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
`
const InputGroupRight = styled.div`
  margin-bottom: 25px;
`

export const MobileNavigation = () => {
  const theme = useAppSelector(remoteStorage.selector(UI_THEME_KEY))
  const [showMenu, setShowMenu] = useState(false)

  const isDark = theme === 'dark'

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <Content>
      <MobileMenu show={showMenu} toggleMenu={toggleMenu} isDark={isDark} />
      <InputGroupLeft>
        <IconButton icon={<Burger />} onClick={toggleMenu} />
        <Profile />
      </InputGroupLeft>
      <LogoLink to={DASHBOARD}>
        <LogoContainer>{isDark ? <LogoDark /> : <LogoLight />}</LogoContainer>
      </LogoLink>
      <InputGroupRight>
        <Notifications />
      </InputGroupRight>
    </Content>
  )
}
