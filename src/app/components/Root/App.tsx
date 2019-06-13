import * as React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { settingsRoutes } from '../../../settings/settings.routes'
import { RouteDef } from '../../app.types'
import { providerRoutes } from '../../../provider/provider.routes'
import { clientRoutes } from '../../../client/client.routes'
import { NAV_TERMS, NAV_WELCOME } from '../../app.links'
import AppHeader from '../AppHeader/AppHeader'
import Terms from '../../pages/Terms/Terms'
import Welcome from '../../pages/Welcome/Welcome'
import ConnectionHistory from '../ConnectionHistory/ConnectionHistory'
import AppAbout from '../AppAbout/AppAbout'
import AppWarningPopup from '../AppWarningPopup/AppWarningPopup'

const mainRoutes: RouteDef[] = [...clientRoutes, ...providerRoutes, ...settingsRoutes]

const Main = () => (
  <div>
    <AppHeader />
    <AppAbout />
    <ConnectionHistory />
    <AppWarningPopup />
    {mainRoutes.map(route => {
      return <Route exact key={route.path} path={route.path} component={route.component} />
    })}
  </div>
)
const App = () => (
  <div>
    <Switch>
      <Redirect exact path="/" to={NAV_WELCOME} />
      <Route exact key={NAV_WELCOME} path={NAV_WELCOME} component={Welcome} />
      <Route exact key={NAV_TERMS} path={NAV_TERMS} component={Terms} />
      <Main />
    </Switch>
  </div>
)

export default withRouter(App)
