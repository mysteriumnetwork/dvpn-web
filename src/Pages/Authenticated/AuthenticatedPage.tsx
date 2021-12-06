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
import { CircularProgress } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Identity } from 'mysterium-vpn-js'
import { isEmpty, isRegistered, isRegistrationError } from '../../commons/identity.utils'
import CopyToClipboard from '../../Components/CopyToClipboard/CopyToClipboard'
import SessionSidebarPage from './SessionSidebar/SessionSidebarPage'

const RegistrationOverlay = ({ identityRef }: { identityRef: string }) => {
  return (
    <div className="registration-status">
      <div className="registration-status__content">
        <CircularProgress className="m-r-10" disableShrink />
        <h2>Your identity is being registered, please be patient...</h2>
      </div>
      <div className="registration-status__footer">
        <span className="registration-status__identity">{identityRef}</span>
        <CopyToClipboard text={identityRef} />
      </div>
    </div>
  )
}

const HelpArrow = () => {
  return (
    <>
      <div className="intercom-help-pointer">
        <ArrowBackIcon className="intercom-help-pointer__arrow" fontSize="large" />
        <h2>have questions? Talk to us!</h2>
      </div>
    </>
  )
}

interface Props {
  identity: Identity
}

const displayOverlay = (identity: Identity): boolean => {
  if (isEmpty(identity)) {
    return false
  }

  return !isRegistered(identity)
}

const displayRegistrationFailed = (identity: Identity): boolean => {
  return isRegistrationError(identity)
}

const AuthenticatedPage = ({ identity }: Props) => {
  return (
    <div className="page">
      {displayOverlay(identity) && (
        <>
          <div className="registration-overlay" />
          <RegistrationOverlay identityRef={identity.id} />
          <HelpArrow />
          {displayRegistrationFailed(identity) && <div>It seems identity registration Failed on blockchain.</div>}
        </>
      )}
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
