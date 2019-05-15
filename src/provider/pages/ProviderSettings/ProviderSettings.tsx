import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectionInformation from './components/ConnectionInformation/ConnectionInformation'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { connect } from 'react-redux'
import { ProviderReducer } from '../../reducer'
import { DefaultProps } from '../../../types'
import { setResidentialConfirmAction, setTrafficOptionAction } from '../../actions'
import { withStyles } from '@material-ui/core'
import { startVpnServerStory } from '../../stories'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderReducer

  onChangeTrafficOption: (value: string) => void
  onChangeResidentialConfirm: (value: boolean) => void
  onStartVpnServer: (provider: ProviderReducer) => void
}

const ProviderSettings = (props: Props) => {
  const { provider, onChangeTrafficOption, onChangeResidentialConfirm, onStartVpnServer } = props
  const id = (provider && provider.identity && provider.identity.id) || ''

  return (
    <div className={styles.appProviderSettingsCover}>
      <div className={styles.scrollView}>
        <h1>{trans('app.provider.settings.share.your.connection')}</h1>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.flexedRow}>
              <p>{trans('app.provider.settings.my.id')}</p>
              <div title={id}>{id.substr(2)}</div>
            </div>
            {/* render dynamic Airdrop Wallet */}
            <AirdropWallet provider={provider}
                           onChangeTrafficOption={onChangeTrafficOption} />
          </div>
          {/* ExpansionPanel component with connection information */}
          <ConnectionInformation provider={provider}
                                 onChangeResidentialConfirm={onChangeResidentialConfirm} />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button onClick={() => onStartVpnServer(provider)}
                color="primary"
                disabled={!id}>
          {trans('app.provider.settings.start.vpn')}
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  onChangeTrafficOption: (value) => dispatch(setTrafficOptionAction(value)),
  onChangeResidentialConfirm: (value) => dispatch(
    setResidentialConfirmAction(value)),
  onStartVpnServer: (provider) => startVpnServerStory(dispatch, provider)
})

export default withStyles({})(
  connect(mapStateToProps, mapDispatchToProps)(ProviderSettings))

