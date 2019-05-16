import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectionInformation from './components/ConnectionInformation/ConnectionInformation'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { connect } from 'react-redux'
import { ProviderReducer } from '../../reducer'
import { DefaultProps } from '../../../types'
import { setProviderStateAction, setResidentialConfirmAction, setTrafficOptionAction } from '../../actions'
import { withStyles } from '@material-ui/core'
import { startVpnServerStory, updateIdentitiesStory } from '../../stories'
import { getFormValues } from 'redux-form/immutable'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { Redirect } from 'react-router'
import { NAV_PROVIDER_DASHBOARD } from '../../provider.links'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderReducer
  formWalletAddressData?: Object
  onSaveWalletAddress?: (data: Object) => void
  onChangeTrafficOption: (value: string) => void
  onChangeResidentialConfirm: (value: boolean) => void
  onStartVpnServer: (provider: ProviderReducer) => void
}

class ProviderSettings extends React.PureComponent<Props> {

  handleStartVpnServer = () => {
    const { provider, onStartVpnServer } = this.props

    onStartVpnServer(provider)
  }

  render() {
    const { provider, onChangeResidentialConfirm } = this.props

    if (provider.startedService && provider.startedService.id) return (<Redirect to={NAV_PROVIDER_DASHBOARD} />)

    const id = (provider && provider.identity && provider.identity.id) || ''

    return (<div className={styles.appProviderSettingsCover}>
      <div className={styles.scrollView}>
        <h1>{trans('app.provider.settings.share.your.connection')}</h1>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.flexedRow}>
              <p>{trans('app.provider.settings.my.id')}</p>
              <div title={id}>{id.substr(2)}</div>
            </div>
            {/* render dynamic Airdrop Wallet */}
            <AirdropWallet {...this.props} />
          </div>
          {/* ExpansionPanel component with connection information */}
          <ConnectionInformation provider={provider}
                                 onChangeResidentialConfirm={onChangeResidentialConfirm} />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button onClick={this.handleStartVpnServer}
                color="primary"
                disabled={!id || provider.startedServicePending}>
          {trans('app.provider.settings.start.vpn')}
        </Button>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state),
})

const mapDispatchToProps = (dispatch) => ({
  onChangeTrafficOption: (value) => dispatch(setTrafficOptionAction(value)),
  onChangeResidentialConfirm: (value) => dispatch(setResidentialConfirmAction(value)),
  onStartVpnServer: (provider) => startVpnServerStory(dispatch, provider),
  onSaveWalletAddress: (value) => updateIdentitiesStory(dispatch, value),
  onSetState: (value) => dispatch(setProviderStateAction(value))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(ProviderSettings))

