import React, { PureComponent } from 'react'
import { NAV_SETTINGS_PASSWORD } from 'settings/settings.links'
import Button from '../../../../../ui-kit/components/Button/Button'
import trans from '../../../../../trans'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { NAV_SETTINGS, NAV_STATISTICS } from '../../../../web.links'
import { DashboardProps } from '../../types'
import _ from 'lodash'
import { APP_EVENTS } from '../../../../../constants'

const styles = require('./DashboardActions.module.scss')

export class DashboardActions extends PureComponent<DashboardProps> {
  handleDisconnect = () => {
    const { onStopVpnServer } = this.props
    const startedServices = _.get(this.props, 'provider.startedServices')

    return onStopVpnServer(startedServices)
  }

  handleStart = () => {
    const { onStartVpnServer, provider } = this.props

    return onStartVpnServer(provider)
  }

  handleReportIssue = () => {
    const { events } = this.props
    events.emit(APP_EVENTS.REPORT_ISSUE_DIALOG_SHOW)
  }

  render() {
    const { provider } = this.props
    const isActiveServices = Boolean(provider.startedServices && provider.startedServices.length)

    return (
      <div className={styles.dashboardActions}>
        <Button color="secondary" component={Link} to={NAV_STATISTICS}>
          {trans('app.menu.statistics')}
        </Button>
        <Button color="secondary" onClick={this.handleReportIssue}>
          {trans('app.menu.report.issue')}
        </Button>
        <Button color="secondary" component={Link} to={NAV_SETTINGS}>
          {trans('app.menu.settings')}
        </Button>
        <Button color="secondary" component={Link} to={NAV_SETTINGS_PASSWORD}>
          {trans('app.menu.change_password')}
        </Button>
        <Button color="secondary"
                onClick={isActiveServices ? this.handleDisconnect : this.handleStart}
                disabled={provider.startedServicePending}
                className={classNames(styles.serviceBtn, isActiveServices ? styles.started : styles.stopped)}>
          {provider.startedServicePending
            ? (<i className="tree-balls-loader purple"/>)
            : trans(isActiveServices ? 'app.provider.disconnect.button' : 'app.provider.settings.start.vpn')}
        </Button>
      </div>
    )
  }
}
