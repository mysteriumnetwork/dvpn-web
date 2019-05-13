import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD, NAV_CLIENT_CONNECTING } from '../../client.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectionFailedImgBlock from './components/ConnectionFailedImgBlock/ConnectionFailedImgBlock'
import ConnectionFailedInfoBlock from './components/ConnectionFailedInfoBlock/ConnectionFailedInfoBlock'

const styles = require('./ClientConnectionFailed.scss')

const ConnectionFailed = () => (
  <div className={styles.root}>
    <h3 className={styles.title}>{trans('app.client.connection.failed')}</h3>
    <div>
      <ConnectionFailedImgBlock />
      <ConnectionFailedInfoBlock />
    </div>
    <div className={styles.action}>
      <Link to={NAV_CLIENT_CONNECTING}>
        <Button color="primary">{trans('app.client.retry.button')}</Button>
      </Link>
      <Link to={NAV_CLIENT_DASHBOARD}>
        <Button color="primary">{trans('app.client.go.back.button')}</Button>
      </Link>
    </div>
  </div>
)

export default ConnectionFailed
