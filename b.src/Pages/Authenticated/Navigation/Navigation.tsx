/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ReactComponent as Dashboard } from '../../../assets/images/authenticated/components/navigation/Dashboard.svg'
import { ReactComponent as DashboardActive } from '../../../assets/images/authenticated/components/navigation/DashboardActive.svg'
import { ReactComponent as Logo } from '../../../assets/images/authenticated/components/navigation/Logo.svg'
import { ReactComponent as Sessions } from '../../../assets/images/authenticated/components/navigation/Sessions.svg'
import { ReactComponent as SessionsActive } from '../../../assets/images/authenticated/components/navigation/SessionsActive.svg'
import { ReactComponent as SessionsSidebar } from '../../../assets/images/authenticated/components/navigation/SessionsSidebar.svg'
import { ReactComponent as SessionsSidebarActive } from '../../../assets/images/authenticated/components/navigation/SessionsSidebarActive.svg'
import { ReactComponent as Settings } from '../../../assets/images/authenticated/components/navigation/Settings.svg'
import { ReactComponent as SettingsActive } from '../../../assets/images/authenticated/components/navigation/SettingsActive.svg'
import { ReactComponent as Wallet } from '../../../assets/images/authenticated/components/navigation/Wallet.svg'
import { ReactComponent as WalletActive } from '../../../assets/images/authenticated/components/navigation/WalletActive.svg'
import ReportIssue from '../../../Components/ReportIssues/ReportIssue'
import { DASHBOARD, SESSIONS, SESSIONS_SIDE, SETTINGS, WALLET } from '../../../constants/routes'

import './Navigation.scss'

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Load intercom chat
    // @ts-ignore
    window.Intercom('boot', {
      app_id: 'h7hlm9on',
    })
  }, [])

  return (
    <div className="navigation">
      <Link to={DASHBOARD} className="navigation--logo">
        <Logo />
      </Link>

      <NavLink to={DASHBOARD} className={'navigation--item '}>
        {pathname === DASHBOARD ? <DashboardActive /> : <Dashboard />}
      </NavLink>
      <NavLink to={SESSIONS} className={'navigation--item '}>
        {pathname === SESSIONS ? <SessionsActive /> : <Sessions />}
      </NavLink>
      <NavLink to={SETTINGS} className={'navigation--item '}>
        {pathname === SETTINGS ? <SettingsActive /> : <Settings />}
      </NavLink>
      <NavLink to={SESSIONS_SIDE} className={'mobile navigation--item '}>
        {pathname === SESSIONS_SIDE ? <SessionsSidebarActive /> : <SessionsSidebar />}
      </NavLink>
      <NavLink to={WALLET} className={'navigation--item '}>
        {pathname === WALLET ? <WalletActive /> : <Wallet />}
      </NavLink>
      <div className="flex-grow" />
      <div className="navigation--issue">
        <ReportIssue />
      </div>
      <div className="navigation--chat-space" />
    </div>
  )
}
export default Navigation
