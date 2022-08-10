/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrow-left.svg'
import { NavLink, useLocation } from 'react-router-dom'
import { ReportIssue } from '../Components/ReportIssue/ReportIssue'
import { ThemeSwitch } from '../Components/ThemeSwitch/ThemeSwitch'
import {
  DashboardNavIcon,
  SessionsNavIcon,
  SettingsNavIcon,
  WalletNavIcon,
} from '../../../Components/Icons/NavigationIcons'
import {
  DASHBOARD,
  HISTORY,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../../../constants/routes'
interface OverlayProps {
  $display: boolean
}
const PlainLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  gap: 40px;
  margin-bottom: 30px;
`
const Arrow = styled(ArrowLeft)`
  height: 32px;
  width: 32px;
  top: -2px;
  position: relative;
  :hover {
    cursor: pointer;
  }
`
const Overlay = styled.div<OverlayProps>`
  display: ${({ $display }) => (!$display ? 'none' : 'flex')};
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${themeCommon.colorDarkBlue + alphaToHex(0.77)};
  align-items: flex-start;
`
const Menu = styled.div<OverlayProps>`
  display: ${({ $display }) => (!$display ? 'none' : 'flex')} !important;
  height: 100%;
  width: 70%;
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #230536 0%, #711b58 100%);
  display: flex;
  flex-direction: column;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`
const Title = styled.h1`
  color: ${({ theme }) => theme.common.colorWhite};
  font-size: ${({ theme }) => theme.common.fontSizeHuge};
  font-weight: 900;
`
const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px;
  &:nth-of-type(even) {
    border-bottom: 1px dashed ${themeCommon.colorWhite + alphaToHex(0.05)} !important;
  }
  &:nth-of-type(odd) {
    margin-top: 30px;
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 24px 10px 10px;
  margin-bottom: 20px;
`
interface Props {
  show: boolean
  closeMenu: () => void
}

export const MobileMenu = ({ show, closeMenu }: Props) => {
  const { pathname } = useLocation()
  return (
    <>
      <Overlay $display={show} onClick={closeMenu} />
      <Menu $display={show}>
        <Header>
          <Container>
            <Logo />
            <Title>Node UI</Title>
          </Container>
          <Arrow onClick={closeMenu} />
        </Header>
        <Group>
          <PlainLink to={DASHBOARD} onClick={closeMenu}>
            <DashboardNavIcon $active={pathname === DASHBOARD} />
            Dashboard
          </PlainLink>
          <PlainLink to={HISTORY} onClick={closeMenu}>
            <SessionsNavIcon $active={pathname === HISTORY} />
            History
          </PlainLink>
          <PlainLink to={TRANSACTIONS} onClick={closeMenu}>
            <WalletNavIcon $active={pathname === TRANSACTIONS} />
            Transactions
          </PlainLink>
          <PlainLink to={SETTINGS} onClick={closeMenu}>
            <SettingsNavIcon
              $active={[SETTINGS, SETTINGS_TRAFFIC, SETTINGS_ADVANCED, SETTINGS_ACCOUNT].includes(pathname)}
            />
            Settings
          </PlainLink>
        </Group>
        <Group>
          <ReportIssue />
          <ThemeSwitch />
        </Group>
      </Menu>
    </>
  )
}
