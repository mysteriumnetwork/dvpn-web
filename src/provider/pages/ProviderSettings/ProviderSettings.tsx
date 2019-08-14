import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { connect } from 'react-redux'
import { ProviderState } from '../../reducer'
import { DefaultProps } from '../../../types'
import { withStyles } from '@material-ui/core'
import { destroyProvidersStory, initProviderStory, saveSettingsStory, } from '../../stories'
import { getFormValues } from 'redux-form/immutable'
import { compose } from 'redux'
import _ from 'lodash'
import immutableProps from '../../../hocs/immutableProps'
import ErrorDialog from '../../../ui-kit/components/ErrorDialog'
import { setProviderStateAction, setTrafficOptionAction } from '../../actions'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderState
  formWalletAddressData?: Object
  // onSaveWalletAddress?: (data: Object) => void
  // onSaveReferralCode?: (data: Object) => void
  onSetState?: (data: Object) => void
  onChangeTrafficOption: (value: string) => void
  // onChangeResidentialConfirm: (value: boolean) => void
  // onStartVpnServer: (provider: ProviderState) => void,
  onInit?: Function
  onDestroy?: Function
  onSaveSettings?: Function
}

class ProviderSettings extends React.PureComponent<Props> {
  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  componentWillUnmount() {
    const { onDestroy } = this.props

    return onDestroy && onDestroy()
  }

  handleStartVpnServer = () => {
    const { formWalletAddressData, provider, onSaveSettings } = this.props

    onSaveSettings({
      ...formWalletAddressData,
      id: provider.identity.id,
      trafficOption: provider.trafficOption,
    })
  }

  handleCloseErrorDialog = () => {
    const { onSetState } = this.props

    onSetState({
      generalError: null
    })
  }

  render() {
    const { provider } = this.props

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

          {/* ExpansionPanel component with connection information
          <ConnectionInformation provider={provider}
                                 onChangeResidentialConfirm={onChangeResidentialConfirm}/>*/}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button
          onClick={this.handleStartVpnServer}
          color="primary"
        >
          {trans('app.provider.settings.save')}
        </Button>
      </div>
      {_.get(provider, 'state.generalError') && (
        <ErrorDialog onClose={this.handleCloseErrorDialog}>
          {_.get(provider, 'state.generalError')}
        </ErrorDialog>
      )}

    </div>)
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  formWalletAddressData: getFormValues('walletAddress')(state)
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initProviderStory(dispatch),
  onDestroy: () => destroyProvidersStory(dispatch),
  onChangeTrafficOption: (value) => dispatch(setTrafficOptionAction(value)),
  // onChangeResidentialConfirm: (value) => dispatch(setResidentialConfirmAction(value)),
  // onStartVpnServer: (provider) => startVpnServerStory(dispatch, provider),
  // onSaveWalletAddress: (value) => updateIdentitiesStory(dispatch, value),
  // onSaveReferralCode: (value) => updateReferralStory(dispatch, value),
  onSetState: (value) => dispatch(setProviderStateAction(value)),
  onSaveSettings: payload => saveSettingsStory({ payload, dispatch }),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(ProviderSettings))

