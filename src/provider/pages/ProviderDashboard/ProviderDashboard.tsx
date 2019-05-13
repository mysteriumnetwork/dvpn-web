import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_PROVIDER_SETTINGS } from '../../provider.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionInfo from './components/ConnectionInfo/ConnectionInfo'
import UsersList from './components/UsersList/UsersList'

const styles = require('./ProviderDashboard.module.scss')

const ProviderDashboard = () => (
  <div className={styles.dashboardCover}>
    <div className={styles.dashboardHeader}>
      <h4>
        <p>9{trans('app.node.running.users.connected')}</p>
        <p>
          9{trans('app.node.running.successful.connections')}
          <span>/</span>
          11{trans('app.node.running.attempted')}
        </p>
      </h4>
      <Link to={NAV_PROVIDER_SETTINGS}>
        <Button variant="contained" color="secondary">
          Disconnect
        </Button>
      </Link>
    </div>
    <ConnectionInfo />
    <UsersList />
    <BottomBar />
  </div>
)

export default ProviderDashboard
