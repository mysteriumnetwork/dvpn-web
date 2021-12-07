/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './AuthenticatedPage.scss'
import { Redirect, Route, Switch } from 'react-router-dom'

import { DASHBOARD, NOT_FOUND, SESSIONS, SESSIONS_SIDE, SETTINGS, WALLET } from '../../constants/routes'

import Dashboard from './Dashboard/Dashboard'
import Sessions from './Sessions/Sessions'
import Settings from './Settings/Settings'
import Wallet from './Wallet/Wallet'
import Navigation from './Navigation/Navigation'
import { Identity } from 'mysterium-vpn-js'
import { isEmpty, isRegistered } from '../../commons/identity.utils'
import SessionSidebarPage from './SessionSidebar/SessionSidebarPage'
import { RegistrationOverlay } from './RegistrationOverlay'

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
            <Dashboard />
          </Route>
          <Route exact={true} path={SESSIONS}>
            <Sessions />
          </Route>
          <Route exact={true} path={SETTINGS}>
            <Settings />
          </Route>
          <Route exact={true} path={SESSIONS_SIDE}>
            <SessionSidebarPage />
          </Route>
          <Route exact={true} path={WALLET}>
            <Wallet />
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
