import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_PROVIDER_DASHBOARD } from '../../provider.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectionInformation from './components/ConnectionInformation/ConnectionInformation'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'

const styles = require('./ProviderSettings.module.scss')

const ProviderSettings = () => (
  <div className={styles.appProviderSettingsCover}>
    <div className={styles.scrollView}>
      <h1>{trans('app.provider.settings.share.your.connection')}</h1>
      <div className={styles.contentContainer}>
        <div>
          <div className={styles.flexedRow}>
            <p>{trans('app.provider.settings.my.id')}</p>
            {/* TODO replace with dynamic info */}
            <div>d617f200ef28a3a3ca2fc78a86d190e5c6f8eb0c</div>
          </div>
          {/* render dynamic Airdrop Wallet */}
          <AirdropWallet />
        </div>
        {/* ExpansionPanel component with connection information */}
        <ConnectionInformation />
      </div>
    </div>
    <div className={styles.bottomBar}>
      <Link to={NAV_PROVIDER_DASHBOARD}>
        <Button color="primary">{trans('app.provider.settings.start.vpn')}</Button>
      </Link>
    </div>
  </div>
)

export default ProviderSettings
