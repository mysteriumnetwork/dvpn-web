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
import { ReactComponent as Settings } from '../../../assets/images/authenticated/components/navigation/Settings.svg'
import { ReactComponent as SettingsActive } from '../../../assets/images/authenticated/components/navigation/SettingsActive.svg'
import { ReactComponent as Wallet } from '../../../assets/images/authenticated/components/navigation/Wallet.svg'
import { ReactComponent as WalletActive } from '../../../assets/images/authenticated/components/navigation/WalletActive.svg'
import { DASHBOARD, SESSIONS, SETTINGS, WALLET } from '../../../constants/routes'

import './Navigation.scss'
import styles from './Navigation.module.scss'

const Navigation = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Load intercom chat
    // @ts-ignore
    window.Intercom('boot', {
      app_id: 'h7hlm9on',
    })
  }, [])

  return (
    <div className={styles.navigation}>
      <Link to={DASHBOARD} className={styles.logo}>
        <Logo />
      </Link>
      <NavLink to={DASHBOARD} className={styles.navItem}>
        {pathname === DASHBOARD ? <DashboardActive /> : <Dashboard />}
      </NavLink>
      <NavLink to={SESSIONS} className={styles.navItem}>
        {pathname === SESSIONS ? <SessionsActive /> : <Sessions />}
      </NavLink>
      <NavLink to={WALLET} className={styles.navItem}>
        {pathname === WALLET ? <WalletActive /> : <Wallet />}
      </NavLink>
      <NavLink to={SETTINGS} className={styles.navItem}>
        {pathname === SETTINGS ? <SettingsActive /> : <Settings />}
      </NavLink>
      <div className="flex-grow" />
      {/*<div className="navigation--issue">*/}
      {/*  <ReportIssue />*/}
      {/*</div>*/}
      {/*<div className="navigation--chat-space" />*/}
    </div>
  )
}
export default Navigation
