import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionInfo from './components/ConnectionInfo/ConnectionInfo'
import UsersList from './components/UsersList/UsersList'
import { DefaultProps } from '../../../types'
import { ProviderState } from '../../reducer'
import { stopVpnServerStory } from '../../stories'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Redirect } from 'react-router'
import { NAV_PROVIDER_SETTINGS } from '../../provider.links'
import _ from 'lodash'
import { ServiceInfo } from 'mysterium-vpn-js'

const styles = require('./ProviderDashboard.module.scss')

type Props = DefaultProps & {
  provider: ProviderState,
  onStopVpnServer: (services: ServiceInfo[]) => Promise<void>
}

class ProviderDashboard extends React.PureComponent<Props> {

  handleDisconnect = () => {
    const { onStopVpnServer } = this.props
    const startedServices = _.get(this.props, 'provider.startedServices')

    return onStopVpnServer(startedServices)
  }

  render() {
    const { provider } = this.props

    if (!(provider.startedServices && provider.startedServices.length)) {
      return (<Redirect to={NAV_PROVIDER_SETTINGS}/>)
    }
    const sessions = Number(provider.sessions && provider.sessions.length) || 0
    return (<div className={styles.dashboardCover}>
      <div className={styles.dashboardHeader}>
        <h4>
          <p>{trans('app.node.running.sessions.connected')} {sessions}</p>
          <p>
            {trans('app.node.running.successful.connections', { count: sessions })}
            <span> / </span>
            {sessions} {trans('app.node.running.attempted')}
          </p>
        </h4>
        <Button disabled={provider.startedServicePending} onClick={this.handleDisconnect} variant="contained"
                color="secondary">
          {trans('app.provider.disconnect.button')}
        </Button>
      </div>
      <ConnectionInfo provider={provider}/>
      <UsersList provider={provider}/>
      <BottomBar provider={provider}/>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider || {}
})

const mapDispatchToProps = (dispatch) => ({
  onStopVpnServer: (services: ServiceInfo[]) => stopVpnServerStory(dispatch, services)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ProviderDashboard))

