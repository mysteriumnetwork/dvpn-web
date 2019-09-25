import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import AirdropWallet from './components/AirdropWallet/AirdropWallet'
import { ProviderState } from '../../reducer'
import { DefaultProps } from '../../../types'
import _ from 'lodash'
import ErrorDialog from '../../../ui-kit/components/ErrorDialog'

const styles = require('./ProviderSettings.module.scss')

type Props = DefaultProps & {
  provider: ProviderState
  formWalletAddressData?: Object
  onSetState?: (data: Object) => void
  onInit?: Function
  onDestroy?: Function
  onSaveSettings?: Function
}

export class ProviderSettings extends React.PureComponent<Props> {
  private submitForm: Function

  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  componentWillUnmount() {
    const { onDestroy } = this.props

    return onDestroy && onDestroy()
  }

  handleInitForm = (submit) => {
    this.submitForm = submit
  }

  handleSaveSettings = () => {
    this.submitForm && this.submitForm()
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
            <AirdropWallet {...this.props} onInitForm={this.handleInitForm}/>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button
          onClick={this.handleSaveSettings}
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
