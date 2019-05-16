import * as React from 'react'
import _ from 'lodash'
import trans from '../../../../../trans'
import { ProviderReducer } from '../../../../reducer'
import NatStatus from '../../../../../ui-kit/components/NatStatus'
import { NAT_FIX_URL } from '../../../../../constants'
import { NatStatuses } from '../../../../../api/data/nat-status'

const styles = require('./BottomBar.module.scss')

type Props = {
  provider: ProviderReducer,
}

const BottomBar = (props: Props) => (
  <div>
    {_.get(props, 'provider.natStatus.status') === NatStatuses.FAILED && (
      <div className={styles.natUrlBlock}>
        <a href={NAT_FIX_URL} target='_blank' rel="noopener noreferrer">{trans('how.fix.nat')}</a>
      </div>
    )}
    <div className={styles.bottomBar}>
      <div className={styles.bottomBarItemNat}>
        <h4>{trans('app.node.running.nat.status')}</h4>
        <p><NatStatus status={_.get(props, 'provider.natStatus.status')}/></p>
      </div>
      {/*<div className={styles.bottomBarItem}>*/}
      {/*  <h4>{trans('app.node.running.uptime')}</h4>*/}
      {/*  <p>00:00:02:15</p>*/}
      {/*</div>*/}
      {/*<div className={styles.bottomBarItem}>*/}
      {/*  <h4>{trans('app.node.running.downloaded')}</h4>*/}
      {/*  <p>2.06 MB</p>*/}
      {/*</div>*/}
      {/*<div className={styles.bottomBarItem}>*/}
      {/*  <h4>{trans('app.node.running.uploaded')}</h4>*/}
      {/*  <p>128 kB</p>*/}
      {/*</div>*/}
      {/*<div className={styles.bottomBarItem}>*/}
      {/*  <h4>{trans('app.node.running.quality')}</h4>*/}

      {/*  /!* render quality-icon class quality-1/quality-2/quality-3/quality-4 *!/*/}
      {/*  <div className="app-icons quality-1" />*/}
      {/*</div>*/}


    </div>
  </div>
)
export default BottomBar
