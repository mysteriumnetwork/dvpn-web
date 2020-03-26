import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionInfo from './components/ConnectionInfo/ConnectionInfo'
import UsersList from './components/UsersList/UsersList'
import { DefaultProps } from '../../../types'
import { ProviderState } from '../../reducer'
import _ from 'lodash'
import { ServiceInfo } from 'mysterium-vpn-js'
import formatCurrency from "../../../utils/formatCurrency";

const styles = require('./ProviderDashboard.module.scss')

type Props = DefaultProps & {
  provider: ProviderState,
  onStopVpnServer: (services: ServiceInfo[]) => Promise<void>
  onStartVpnServer: Function,
}

export class ProviderDashboard extends React.PureComponent<Props> {

  handleDisconnect = () => {
    const { onStopVpnServer } = this.props
    const startedServices = _.get(this.props, 'provider.startedServices')

    return onStopVpnServer(startedServices)
  }

  handleStart = () => {
    const { onStartVpnServer, provider } = this.props

    return onStartVpnServer(provider)
  }

  render() {
    const { provider } = this.props
    const isActiveServices = !!provider.startedServices && provider.startedServices.length
    const startStopFn = isActiveServices ? this.handleDisconnect : this.handleStart
    // const startStopButtonClassName = isActiveServices ? 'danger' : 'success'
    const sessions = Number(provider.sessions && provider.sessions.length) || 0
    const earnings = Number(provider.identityStatus && provider.identityStatus.earnings) || 0
    const earningsTotal = Number(provider.identityStatus && provider.identityStatus.earningsTotal) || 0

    return (<div className={styles.dashboardCover}>
      <div className={styles.dashboardHeader}>
        <h4>
          <p>{trans('app.node.running.earnings.total', { tokens: formatCurrency(earningsTotal) })}</p>
          <p>
            {trans('app.node.running.sessions.successful', { sessions: sessions })}
            <span> / </span>
            {trans('app.node.running.earnings.new', { tokens: formatCurrency(earnings) })}
          </p>
        </h4>
        <Button disabled={provider.startedServicePending} onClick={startStopFn} color="secondary"
                className={isActiveServices ? 'started' : 'stopped'}>
          {
            isActiveServices
              ? trans('app.provider.disconnect.button')
              : trans('app.provider.settings.start.vpn')
          }
        </Button>
      </div>
      <ConnectionInfo provider={provider}/>
      <UsersList provider={provider}/>
      <BottomBar provider={provider}/>
    </div>)
  }
}
