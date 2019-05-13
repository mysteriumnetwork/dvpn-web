import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD } from '../../../../client.links'
import trans from '../../../../../trans'
import Button from '../../../../../ui-kit/components/Button/Button'

const styles = require('./BottomBarDisconnected.module.scss')

const BottomBarDisconnected = () => (
  <div className={styles.root}>
    <div className={styles.message}>
      <div className={styles.warningIcon} />
      <p>{trans('app.client.node.disconnected')}</p>
    </div>
    <Link to={NAV_CLIENT_DASHBOARD}>
      <Button color="secondary">{trans('app.client.button.ok')}</Button>
    </Link>
  </div>
)
export default BottomBarDisconnected
