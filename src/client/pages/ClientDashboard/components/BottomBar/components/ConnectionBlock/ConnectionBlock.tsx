import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_CONNECTING } from '../../../../../../client.links'
import trans from '../../../../../../../trans'
import Button from '../../../../../../../ui-kit/components/Button/Button'
import CountryItem from './components/CountryItem'
import ConnectionTypeItem from './components/ConnectionTypeItem'

const styles = require('./ConnectionBlock.module.scss')

const ConnectionBlock = () => (
  <div className={styles.root}>
    <div className={styles.info}>
      <p className={styles.infoID}>d617f200ef28a3a3ca2fc78a86d190e5c6f8eb0c</p>
      <div className={styles.infoRow}>
        <CountryItem />
        <ConnectionTypeItem />
      </div>
    </div>
    <div className={styles.action}>
      <Link to={NAV_CLIENT_CONNECTING}>
        <Button color="primary">{trans('app.client.dashboard.connect.button')}</Button>
      </Link>
    </div>
  </div>
)

export default ConnectionBlock
