import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD } from '../../client.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Loader from '../../../ui-kit/components/Loader/Loader'
import ConnectionImgBlock from './components/ConnectionImgBlock/ConnectionImgBlock'
import ConnectionInfoBlock from './components/ConnectionInfoBlock/ConnectionInfoBlock'

const styles = require('./ClientConnecting.module.scss')

const ClientConnecting = () => (
  <div className={styles.root}>
    <h3 className={styles.title}>{trans('app.client.connecting.title')}</h3>
    <div>
      <ConnectionImgBlock />
      <ConnectionInfoBlock />
    </div>
    <Loader />
    <div className={styles.action}>
      <Link to={NAV_CLIENT_DASHBOARD}>
        <Button color="primary">{trans('app.client.cancel.button')}</Button>
      </Link>
    </div>
  </div>
)

export default ClientConnecting
