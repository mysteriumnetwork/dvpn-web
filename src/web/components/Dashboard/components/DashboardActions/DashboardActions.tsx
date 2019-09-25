import React, { PureComponent } from 'react'
import Button from '../../../../../ui-kit/components/Button/Button'
import trans from '../../../../../trans'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { NAV_SETTINGS, NAV_STATISTICS } from '../../../../web.links'
import { ServiceProviderProps } from '../../types'
import _ from 'lodash'

const styles = require('./DashboardActions.module.scss')

export class DashboardActions extends PureComponent<ServiceProviderProps> {
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
    const isActiveServices = Boolean(provider.startedServices && provider.startedServices.length)

    return (
      <div className={styles.dashboardActions}>
        <Button color="secondary" component={Link} to={NAV_STATISTICS}>
          {trans('app.menu.statistics')}
        </Button>
        <Button color="secondary">
          {trans('app.menu.report.issue')}
        </Button>
        <Button color="secondary" component={Link} to={NAV_SETTINGS}>
          {trans('app.menu.settings')}
        </Button>
        <Button color="secondary"
                onClick={isActiveServices ? this.handleDisconnect : this.handleStart}
                disabled={provider.startedServicePending}
                className={classNames(styles.serviceBtn, isActiveServices ? styles.started : styles.stopped)}>
          {provider.startedServicePending
            ? (<i className="tree-balls-loader purple"/>)
            : trans(isActiveServices ? 'app.provider.disconnect.button' : 'app.provider.settings.start.vpn')}
        </Button>
        <div className={styles.activeConnections}>
          &nbsp;
          {isActiveServices && trans('app.node.running.active.connections', { count: 0 })}
          &nbsp;
        </div>
      </div>
    )
  }
}
