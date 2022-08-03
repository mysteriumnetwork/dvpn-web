/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/images/navigation/logo.svg'
import {
  DASHBOARD,
  HISTORY,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_ADVANCED,
  SETTINGS_TRAFFIC,
  TRANSACTIONS,
} from '../../../constants/routes'

import styled, { createGlobalStyle } from 'styled-components'
import { ThemeSwitch } from '../Components/ThemeSwitch/ThemeSwitch'
import {
  DashboardNavIcon,
  SessionsNavIcon,
  SettingsNavIcon,
  WalletNavIcon,
} from '../../../Components/Icons/NavigationIcons'
import { ReportIssue } from '../Components/ReportIssue/ReportIssue'
import { devices } from '../../../theme/themes'
import { Media } from '../../../commons/media'
import { Notifications } from '../Components/Notifications/Notifications'
import { NodeStatus } from '../Components/NodeStatus/NodeStatus'
import { ProgressBar } from '../../../Components/ProgressBar/ProgressBar'
import { configs } from '../../../commons/config'
import { myst } from '../../../commons/mysts'
import { useAppSelector } from '../../../commons/hooks'
import { selectors } from '../../../redux/selectors'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
const IntercomGlobalCSS = createGlobalStyle`
 //.intercom-lightweight-app {
 //   display: none;
 // }

 //#intercom-container > div > iframe {
   //display: none;
 //}
`
const StyledLogo = styled(Logo)`
  @media ${devices.tablet} {
    height: 30px;
    width: 60px;
  }
`
const Content = styled.div`
  background: ${({ theme }) => theme.bgNavigation};
  padding: 0 18px 0 18px;
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: column;
  gap: 10px;

  @media ${devices.tablet} {
    flex-direction: row;
    width: 100%;
    position: fixed;
    height: 100px;
    top: 0;
    z-index: 4;
    padding: 0 10px 0 10px;
    align-items: center;
    justify-content: space-between;
  }
`

const LogoLink = styled(Link)`
  margin-top: 30px;
  margin-bottom: 41px;
  @media ${devices.tablet} {
    margin-top: 15px;
  }
`
const PlainLink = styled(NavLink)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FlexGrow = styled.div`
  flex-grow: 1;
`
const Margin = styled.div`
  margin-bottom: 70px;
`
const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  min-width: 300px;
  background-color: white;
  padding: 25px;
  position: absolute;
  top: 65px;
  left: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bgSettlementMobile};
  box-shadow: 0 5px 20px ${themeCommon.color000065 + alphaToHex(0.15)};
`
const ProgressBarContainer = styled.div`
  width: 35%;
  margin-top: 5px;
`
const Info = styled.div`
  color: ${({ theme }) => theme.common.fontSizeSmall};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.common.colorGrayBlue};
`

const Navigation = () => {
  const { pathname } = useLocation()
  const { earningsTokens } = useAppSelector(selectors.currentIdentitySelector)
  const config = useAppSelector(selectors.configSelector)
  const value = useMemo(() => Number(myst.toEtherBig(earningsTokens.wei).toFixed(2)), [earningsTokens.wei])
  const thresholdMyst = configs.zeroStakeSettlementThreshold(config)

  useEffect(() => {
    // Load intercom chat
    // @ts-ignore
    window.Intercom('boot', {
      app_id: 'h7hlm9on',
    })
  }, [])

  return (
    <Content>
      <Media.Desktop>
        <IntercomGlobalCSS />
        <LogoLink to={DASHBOARD}>
          <Logo />
        </LogoLink>
        <PlainLink to={DASHBOARD}>
          <DashboardNavIcon $active={pathname === DASHBOARD} />
        </PlainLink>
        <PlainLink to={HISTORY}>
          <SessionsNavIcon $active={pathname === HISTORY} />
        </PlainLink>
        <PlainLink to={TRANSACTIONS}>
          <WalletNavIcon $active={pathname === TRANSACTIONS} />
        </PlainLink>
        <PlainLink to={SETTINGS}>
          <SettingsNavIcon
            $active={[SETTINGS, SETTINGS_TRAFFIC, SETTINGS_ADVANCED, SETTINGS_ACCOUNT].includes(pathname)}
          />
        </PlainLink>
        <FlexGrow />
        <ReportIssue />
        {/*<LiveChat />*/}
        <ThemeSwitch />
        <Margin />
      </Media.Desktop>
      <Media.Mobile>
        <LogoLink to={DASHBOARD}>
          <StyledLogo />
        </LogoLink>
        <NodeStatus />
        {/* TODO: CREATE WRAPPER WHEN WE HAVE MORE ICONS*/}
        <Notifications />
        <Progress>
          <Info>Next auto settlement ({myst.display(myst.toWeiBig(thresholdMyst), { fractionDigits: 1 })})</Info>
          <ProgressBarContainer>
            <ProgressBar max={thresholdMyst} value={value} size="small" />
          </ProgressBarContainer>
        </Progress>
      </Media.Mobile>
    </Content>
  )
}
export default Navigation
