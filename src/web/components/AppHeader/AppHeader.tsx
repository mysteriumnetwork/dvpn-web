import * as React from 'react'
import { Link } from 'react-router-dom'
import trans from '../../../trans'
import { ConnectionStatus } from 'mysterium-vpn-js'
import classNames from 'classnames'
import { NAV_DASHBOARD } from '../../web.links'

const styles = require('./AppHeader.module.scss')

export interface IAppHeaderProps {
  routerLocation?: string
  startedServices?: boolean
  connectionStatus?: ConnectionStatus
}

export const AppHeader: React.FunctionComponent<IAppHeaderProps> = (props: IAppHeaderProps) => {
  return (
    <div className={styles.appHeader}>
      <div className={styles.tabContainer}>
        <Link to={NAV_DASHBOARD}>
          <div className={classNames(styles.tab, styles.active)}>
            {trans('app.header.backToDashboard')}
          </div>
        </Link>
      </div>
    </div>
  )
}

