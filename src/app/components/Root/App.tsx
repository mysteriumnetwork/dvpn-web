import * as React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { settingsRoutes } from '../../../settings/settings.routes'
import { RouteDef } from '../../app.types'
import { providerRoutes } from '../../../provider/provider.routes'
import { clientRoutes } from '../../../client/client.routes'
import { NAV_LOGIN, NAV_TERMS, NAV_WELCOME } from '../../app.links'
import AppHeader from '../AppHeader/AppHeader'
import Terms from '../../pages/Terms/Terms'
import Welcome from '../../pages/Welcome/Welcome'
import ConnectionHistory from '../ConnectionHistory/ConnectionHistory'
import AppAbout from '../AppAbout/AppAbout'
import AppWarningPopup from '../AppWarningPopup/AppWarningPopup'
import Login from '../../pages/Login/Login'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { DefaultProps } from '../../../types'
import { TermsState } from '../../pages/Terms/reducer'
import { version } from '@mysteriumnetwork/terms/package.json'

const mainRoutes: RouteDef[] = [...clientRoutes, ...providerRoutes, ...settingsRoutes]

const Main = () => (
  <div>
    <AppHeader/>
    <AppAbout/>
    <ConnectionHistory/>
    <AppWarningPopup/>
    {mainRoutes.map(route => (<Route exact key={route.path} path={route.path} component={route.component}/>))}
  </div>
)

type Props = DefaultProps & {
  terms: TermsState
  onRoutePush: Function
}

class App extends React.PureComponent<Props> {
  constructor(props) {
    super(props)

    if (!(props && props.terms[version])) {
      props.onRoutePush(NAV_TERMS)
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Redirect exact path="/" to={NAV_WELCOME}/>
          <Route exact key={NAV_WELCOME} path={NAV_WELCOME} component={Welcome}/>
          <Route exact key={NAV_TERMS} path={NAV_TERMS} component={Terms}/>
          <Route exact key={NAV_LOGIN} path={NAV_LOGIN} component={Login}/>
          <Main/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  terms: state.terms
})

const mapDispatchToProps = (dispatch) => ({
  onRoutePush: (value) => dispatch(push(value))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withConnect(withRouter(App))
