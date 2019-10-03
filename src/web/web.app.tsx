import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  NAV_DASHBOARD,
  NAV_FAQ,
  NAV_LOGIN,
  NAV_PRIVACY_POLICY,
  NAV_SETTINGS,
  NAV_STATISTICS,
  NAV_TERMS,
  NAV_TERMS_VIEW,
  NAV_WELCOME
} from './web.links'
import Welcome from './components/Welcome'
import Terms from './components/Terms'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivacyPolicy from './components/PrivacyPolicy'
import FAQ from './components/FAQ'
import { version } from '@mysteriumnetwork/terms/package.json'
import { TermsState } from '../app/pages/Terms/reducer'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import Settings from './components/Settings'
import Statistics from './components/Statistics'
import TermsView from './components/TermsView'
import ReportIssue from '../app/components/ReportIssue'

type AppProps = RouteComponentProps & {
  terms: TermsState
  node: NodeHealthcheck
}

class App extends React.PureComponent<AppProps> {
  render() {
    const { terms } = this.props

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
          <Route exact key={NAV_DASHBOARD} path={NAV_DASHBOARD} component={Dashboard}/>
          <Route exact key={NAV_SETTINGS} path={NAV_SETTINGS} component={Settings}/>
          <Route exact key={NAV_STATISTICS} path={NAV_STATISTICS} component={Statistics}/>
          <Route exact key={NAV_FAQ} path={NAV_FAQ} component={FAQ}/>
          <Route exact key={NAV_PRIVACY_POLICY} path={NAV_PRIVACY_POLICY} component={PrivacyPolicy}/>
          <Route exact key={NAV_TERMS_VIEW} path={NAV_TERMS_VIEW} component={TermsView}/>
        </Switch>
        <ReportIssue/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  terms: state.terms,
  node: state.app.node
})

const withConnect = connect(mapStateToProps)

export default withRouter(withConnect(App))
