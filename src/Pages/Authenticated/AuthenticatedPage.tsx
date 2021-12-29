/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './AuthenticatedPage.scss'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  DASHBOARD,
  NOT_FOUND,
  SESSIONS,
  SESSIONS_SIDE,
  SETTINGS,
  VERSION_MANAGEMENT,
  WALLET,
} from '../../constants/routes'

import DashboardPage from './Dashboard/DashboardPage'
import SessionsPage from './Sessions/SessionsPage'
import SettingsPage from './Settings/SettingsPage'
import WalletPage from './Wallet/WalletPage'
import Navigation from './Navigation/Navigation'
import { Identity } from 'mysterium-vpn-js'
import { isEmpty, isRegistered } from '../../commons/identity.utils'
import SessionSidebarPage from './SessionSidebar/SessionSidebarPage'
import { RegistrationOverlay } from './RegistrationOverlay'
import { VersionManagementPage } from './VersionManagement/VersionManagementPage'

interface Props {
  identity: Identity
}

const displayOverlay = (identity: Identity): boolean => {
  if (isEmpty(identity)) {
    return false
  }

  return !isRegistered(identity)
}

const AuthenticatedPage = ({ identity }: Props) => {
  return (
    <div className="page">
      {displayOverlay(identity) && <RegistrationOverlay identity={identity} />}
      <div className="page__menu">
        <Navigation />
      </div>
      <div className="page__content">
        <Switch>
          <Route exact={true} path={DASHBOARD}>
            <DashboardPage />
          </Route>
          <Route exact={true} path={SESSIONS}>
            <SessionsPage />
          </Route>
          <Route exact={true} path={SETTINGS}>
            <SettingsPage />
          </Route>
          <Route exact={true} path={SESSIONS_SIDE}>
            <SessionSidebarPage />
          </Route>
          <Route exact={true} path={WALLET}>
            <WalletPage />
          </Route>
          <Route exact={true} path={VERSION_MANAGEMENT}>
            <VersionManagementPage />
          </Route>
          <Route path="*">
            <Redirect to={NOT_FOUND} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default AuthenticatedPage
