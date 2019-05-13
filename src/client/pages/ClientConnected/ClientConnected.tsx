import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD } from '../../client.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectedImgBlock from './components/ConnectedImgBlock/ConnectedImgBlock'
import ConnectedInfoBlock from './components/ConnectedInfoBlock/ConnectedInfoBlock'
import BottomBar from './components/BottomBar/BottomBar'

const styles = require('./ClientConnected.module.scss')

const ClientConnected = () => (
  <div className={styles.root}>
    <h3 className={styles.title}>{trans('app.client.connected')}</h3>
    <div>
      <ConnectedImgBlock />
      <ConnectedInfoBlock />
    </div>
    <div className={styles.action}>
      <Link to={NAV_CLIENT_DASHBOARD}>
        <Button color="primary">
          <div className={styles.buttonLabel}>
            <div />
            <p>{trans('app.client.remove.from.favorites.button')}</p>
          </div>
        </Button>
      </Link>
      <Link to={NAV_CLIENT_DASHBOARD}>
        <Button color="secondary">{trans('app.client.disconnect.button')}</Button>
      </Link>
    </div>
    <BottomBar />
  </div>
)

export default ClientConnected
