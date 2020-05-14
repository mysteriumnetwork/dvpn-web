import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { ProviderState } from '../../reducer'
import { ConfigData, DefaultProps } from '../../../types'
import _ from 'lodash'
import ErrorDialog from '../../../ui-kit/components/ErrorDialog'
import { InjectedFormProps } from 'redux-form'
import { submit } from '../../../utils/reduxForm'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & InjectedFormProps & {
  provider: ProviderState
  configDefaults: ConfigData
  configData: ConfigData
  formWalletAddressData?: Object
  onSetState?: (data: Object) => void
  onInit?: Function
  onDestroy?: Function
  onSaveSettings?: Function
}

export class ProviderSettings extends React.PureComponent<Props> {
  state = {}

  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  componentWillUnmount() {
    const { onDestroy } = this.props

    return onDestroy && onDestroy()
  }

  static getDerivedStateFromProps(props: Props, state) {
    const { initialize, initialized, provider, configData } = props

    if (!initialized && provider.payout && provider.payout.loaded && configData) {
      const { email, ethAddress, referralCode } = provider.payout
      const { trafficOption } = provider
      const shaperEnabled = Boolean(configData.shaper && configData.shaper.enabled)
      const openVpnPort = configData.openvpn ? configData.openvpn.port : 0
      const providerPriceGiB = configData.payment ? configData.payment["price-gb"] : 0
      const providerPriceMinute = configData.payment ? configData.payment["price-minute"] : 0
      initialize({ email, ethAddress, referralCode, trafficOption, shaperEnabled, openVpnPort, providerPriceGiB, providerPriceMinute })
    }

    return { ...state }
  }

  handleSaveSettings = () => {
    const { onSaveSettings, provider, configData } = this.props

    submit(this.props, (formData: any) => onSaveSettings({
      ...formData.toJS(),
      provider,
      configData
    }))
  }

  handleCloseErrorDialog = () => {
    const { onSetState } = this.props

    onSetState({
      generalError: null
    })
  }

  render() {
    const { provider, configDefaults, formWalletAddressData, change, submitting, initialized } = this.props

    const id = (provider && provider.identity && provider.identity.id) || ''

    return (<div className={styles.appProviderSettingsCover}>
      <div className={styles.scrollView}>
        <h1>{trans('app.provider.settings.share.your.connection')}</h1>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.flexedRow}>
              <p>{trans('app.provider.settings.my.id')}</p>
              <div title={id}>{id}</div>
            </div>
            <AirdropWallet
              formWalletAddressPrefill={{
                "openVpnPort": configDefaults.openvpn ? configDefaults.openvpn.port : 0,
                "providerPriceGiB": configDefaults.payment ? configDefaults.payment["priceGb"] : 0,
                "providerPriceMinute": configDefaults.payment ? configDefaults.payment["priceMinute"] : 0,
              }}
              formWalletAddressData={formWalletAddressData}
              change={change}
              submitting={!initialized || submitting}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button
          onClick={this.handleSaveSettings}
          color="primary"
          disabled={!initialized || submitting}
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
