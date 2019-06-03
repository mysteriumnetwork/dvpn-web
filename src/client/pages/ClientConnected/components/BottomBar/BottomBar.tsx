import * as React from 'react'
import trans from '../../../../../trans'
import { ConnectionStatistics } from 'mysterium-vpn-js/lib/connection/statistics'
import formatDuration from 'format-duration'
import formatBytes from '../../../../../utils/formatBytes'

const styles = require('./BottomBar.module.scss')

type Props = {
  statistics?: ConnectionStatistics
}

const BottomBar = (props: Props) => {
  const { duration = 0, bytesReceived = 0, bytesSent = 0 } = props.statistics || {}

  return (
    <div className={styles.bottomBar}>
      {/* Render dynamic values */}
      <div className={styles.bottomBarItem}>
        <h4>{trans('app.node.running.uptime')}</h4>
        <p>{formatDuration(duration * 1000, { leading: true })}</p>
      </div>
      <div className={styles.bottomBarItem}>
        <h4>{trans('app.node.running.downloaded')}</h4>
        <p>{formatBytes(bytesReceived)}</p>
      </div>
      <div className={styles.bottomBarItem}>
        <h4>{trans('app.node.running.uploaded')}</h4>
        <p>{formatBytes(bytesSent)}</p>
      </div>
      <div className={styles.bottomBarItem}>
        <h4>{trans('app.node.running.quality')}</h4>

        {/* render quality-icon class quality-1/quality-2/quality-3/quality-4 */}
        <div className="app-icons quality-1"/>
      </div>
    </div>
  )
}
export default BottomBar
