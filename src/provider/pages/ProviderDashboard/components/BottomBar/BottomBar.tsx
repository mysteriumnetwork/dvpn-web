import * as React from 'react'
import trans from '../../../../../trans'
import { ProviderReducer } from '../../../../reducer'

const styles = require('./BottomBar.module.scss')

type Props = {
  provider: ProviderReducer,
}

const BottomBar = (props: Props) => (
  <div className={styles.bottomBar}>
    {/* Render dynamic values */}
    <div className={styles.bottomBarItem}>
      <h4>{trans('app.node.running.uptime')}</h4>
      <p>00:00:02:15</p>
    </div>
    <div className={styles.bottomBarItem}>
      <h4>{trans('app.node.running.downloaded')}</h4>
      <p>2.06 MB</p>
    </div>
    <div className={styles.bottomBarItem}>
      <h4>{trans('app.node.running.uploaded')}</h4>
      <p>128 kB</p>
    </div>
    <div className={styles.bottomBarItem}>
      <h4>{trans('app.node.running.quality')}</h4>

      {/* render quality-icon class quality-1/quality-2/quality-3/quality-4 */}
      <div className="app-icons quality-1" />
    </div>
  </div>
)
export default BottomBar
