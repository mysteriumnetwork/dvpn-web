import * as React from 'react'
import { Link } from 'react-router-dom'
import { NAV_PROVIDER_DASHBOARD } from '../../provider.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectionInformation from './components/ConnectionInformation/ConnectionInformation'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { connect } from 'react-redux'
import { ProviderReducer } from '../../reducer'
import { DefaultProps } from '../../../types'
import { setResidentialConfirmAction, setTrafficOptionAction } from '../../actions'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderReducer

  onChangeTrafficOption: (value: string) => void
  onChangeResidentialConfirm: (value: boolean) => void
}

const ProviderSettings = (props: Props) => {
  return (
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
            <AirdropWallet provider={props.provider} onChangeTrafficOption={props.onChangeTrafficOption} />
          </div>
          {/* ExpansionPanel component with connection information */}
          <ConnectionInformation provider={props.provider}
                                 onChangeResidentialConfirm={props.onChangeResidentialConfirm} />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Link to={NAV_PROVIDER_DASHBOARD}>
          <Button color="primary">{trans('app.provider.settings.start.vpn')}</Button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  onChangeTrafficOption: (value) => dispatch(setTrafficOptionAction(value)),
  onChangeResidentialConfirm: (value) => dispatch(setResidentialConfirmAction(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSettings)

