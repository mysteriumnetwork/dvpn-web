import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { settingsRoutes } from '../../../settings/settings.routes'
import { RouteDef } from '../../app.types'
import { providerRoutes } from '../../../provider/provider.routes'
import { clientRoutes } from '../../../client/client.routes'
import { NAV_LOGIN, NAV_TERMS, NAV_TERMS_VIEW, NAV_WELCOME } from '../../app.links'
import AppHeader from '../AppHeader/AppHeader'
import Terms from '../../pages/Terms'
import Welcome from '../../pages/Welcome'
import ConnectionHistory from '../ConnectionHistory/ConnectionHistory'
import AppAbout from '../AppAbout/AppAbout'
import AppWarningPopup from '../AppWarningPopup/AppWarningPopup'
import Login from '../../pages/Login'
import { connect } from 'react-redux'
import { TermsState } from '../../pages/Terms/reducer'
import { version } from '@mysteriumnetwork/terms/package.json'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import injectSheet from 'react-jss'

const mainRoutes: RouteDef[] = [...clientRoutes, ...providerRoutes, ...settingsRoutes]

const Main = (props) => (
  <div>
    <AppHeader/>
    <AppAbout node={props.node}/>
    <ConnectionHistory/>
    <AppWarningPopup/>
    {mainRoutes.map(route => (<Route exact key={route.path} path={route.path} component={route.component}/>))}
    <Route exact key={NAV_TERMS_VIEW} path={NAV_TERMS_VIEW} component={(props) => <Terms {...props} view/>}/>
  </div>
)

interface IStyles {
  version: string
}

type Props = RouteComponentProps & {
  terms: TermsState
  node: NodeHealthcheck
  classes: IStyles
}

const styles = () => ({
  version: {
    position: 'fixed',
    zIndex: 10000,
    right: 0,
    bottom: 0,
    padding: '1px 3px',
    fontSize: '85%',
    opacity: 0.5,
    background: '#f7f7f7'
  }
})

class App extends React.PureComponent<Props> {
  render() {
    const { terms, node, classes } = this.props

    return (
      <div>
        <Switch>
          <Redirect exact path="/" to={NAV_WELCOME}/>
          <Route exact key={NAV_WELCOME} path={NAV_WELCOME} component={Welcome}/>
          <Route exact key={NAV_TERMS} path={NAV_TERMS} component={Terms}/>
          <Route exact key={NAV_LOGIN} path={NAV_LOGIN} component={Login}/>
          {
            !terms[version] && (<Redirect to={NAV_TERMS} strict/>)
          }
          <Main node={node}/>
        </Switch>
        {node && (<div className={classes.version}>{node.version}</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  terms: state.terms,
  node: state.app.node
})

const withConnect = connect(mapStateToProps)

export default injectSheet(styles)(withRouter(withConnect(App)))
