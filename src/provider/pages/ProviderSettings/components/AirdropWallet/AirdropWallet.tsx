import * as React from 'react'
import _ from 'lodash'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import trans from '../../../../../trans'
import { ProviderReducer, TrafficOptions } from '../../../../reducer'
import { reduxForm } from 'redux-form/immutable'
import { compose } from 'redux'
import immutableProps from '../../../../../hocs/immutableProps'
import RectangleLoading from '../../../../../ui-kit/components/RectangleLoading'
import injectSheet from 'react-jss'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'
import { submit } from '../../../../../utils/reduxForm'
import { InjectedFormProps } from 'redux-form'
import validate from './validate'
import styles from  "./AirdropWallet.module.scss"

type Props = InjectedFormProps & {
  state: { isWalletEditMode: boolean }
  provider: ProviderReducer
  onChangeTrafficOption?: (value: string) => void
  formWalletAddressData?: Object
  onSaveWalletAddress?: (data: Object) => void
  onSetState?: (data: Object) => void
}

class AirdropWallet extends React.PureComponent<Props> {
  handleTrafficChange = event => {
    const { onChangeTrafficOption } = this.props
    onChangeTrafficOption(event.target.level)
  }

  handleToggleWalletEditMode = () => {
    const { provider, onSetState, initialize, reset } = this.props
    const isWalletEditMode = _.get(provider, 'state.isWalletEditMode')
    onSetState({ isWalletEditMode: !isWalletEditMode })
    reset()
    if (!isWalletEditMode) {
      initialize({
        passphrase: '',
        ethAddress: _.get(provider, 'payout.ethAddress', '')
      })
    }
  }

  handleWalletChange = () => {
    const { formWalletAddressData, provider, onSaveWalletAddress } = this.props
    submit(this.props, () => onSaveWalletAddress({
      ...formWalletAddressData,
      id: provider.identity.id
    }))
  }

  get showTrafficOptions() {
    const { provider } = this.props
    const type = provider.originalLocation && provider.originalLocation.node_type

    return Boolean(provider.accessPolicy) && (type === 'residential')
  }

  render() {
    const { provider, error, submitting } = this.props
    const isWalletEditMode = _.get(provider, 'state.isWalletEditMode')
    return (
      <div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.wallet')}</p>

          <div>
            {isWalletEditMode ? (
              <div className={styles.editableField}>
                <TextField placeholder="0x..." name="ethAddress" disabled={submitting}
                           className={styles.editableTextField}/>
                <div className={styles.buttons}>
                  <IconButton color="primary" onClick={this.handleWalletChange} disabled={submitting}>
                    <SaveIcon fontSize="small"/>
                  </IconButton>
                  <IconButton color="secondary" onClick={this.handleToggleWalletEditMode} disabled={submitting}>
                    <CancelIcon fontSize="small"/>
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className={styles.savedWallet}>
                {_.get(provider, 'payout.loading') !== false ? (
                  <div className={styles.flexCenter}>
                    <RectangleLoading width='370px' height='16px'/>
                  </div>
                ) : (
                  <div className={styles.flexCenter}>
                    <p>{_.get(provider, 'payout.ethAddress', '')}</p>
                    <button onClick={this.handleToggleWalletEditMode}>{trans('app.provider.settings.change')}</button>
                  </div>
                )}

              </div>
            )}
            {error && (
              <p className={styles.errorText}>{error}</p>
            )}
            {/*<p className={styles.errorText}>{trans('app.provider.settings.wallet.api-error.ts')}</p>*/}
            <p className={styles.helperText}>{trans('app.provider.settings.wallet.helper.text')}</p>
          </div>
        </div>

        {this.showTrafficOptions && (
          <div className={styles.flexedRow}>
            <p>{trans('app.provider.settings.traffic')}</p>
            <div>
              <div className={styles.radioForm}>
                <RadioButton label={trans('app.provider.settings.verified.partner.traffic')}
                             value={TrafficOptions.SAFE}
                             onChange={this.handleTrafficChange}
                             checked={provider.trafficOption === TrafficOptions.SAFE}/>
                <p className={styles.helperText}>{trans('app.provider.settings.safe.option')}</p>
              </div>
              <div className={styles.radioForm}>
                <RadioButton label={trans('app.provider.settings.all.traffic')}
                             value={TrafficOptions.ALL}
                             onChange={this.handleTrafficChange}
                             checked={provider.trafficOption === TrafficOptions.ALL}/>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default injectSheet({})(compose(
  reduxForm({
    form: 'walletAddress',
    validate
  }),
  immutableProps
)(AirdropWallet))
