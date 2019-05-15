import * as React from 'react'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import trans from '../../../../../trans'
import { ProviderReducer, TrafficOptions } from '../../../../reducer'
import { reduxForm } from 'redux-form/immutable'
import { compose } from 'redux'
import immutableProps from '../../../../../hocs/immutableProps'
import injectSheet from 'react-jss'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'
import { submit } from '../../../../../utils/reduxForm'
import { InjectedFormProps } from 'redux-form'

const styles = require('./AirdropWallet.module.scss')

type Props = InjectedFormProps &{
  provider: ProviderReducer
  onChangeTrafficOption?: (value: string) => void
  formWalletAddressData?: Object
  onSaveWalletAddress?: (data: Object) => void
}

interface State {
  isWalletEditMode: Boolean
}

class AirdropWallet extends React.PureComponent<Props> {
  state: Readonly<State> = {
    isWalletEditMode: false
  }
  handleTrafficChange = event => {
    const { onChangeTrafficOption } = this.props
    onChangeTrafficOption(event.target.value)
  }

  handleToggleWalletEditMode = () => {
    const { isWalletEditMode } = this.state
    this.setState({ isWalletEditMode: !isWalletEditMode })
  }

  handleWalletChange = () => {
    const { formWalletAddressData, provider, onSaveWalletAddress } = this.props
    submit(this.props, () => onSaveWalletAddress({ ...formWalletAddressData, id: provider.identity.id ,passphrase:'test2'}))
    this.handleToggleWalletEditMode()
  }

  get showTrafficOptions() {
    const { provider } = this.props
    const type = provider.originalLocation && provider.originalLocation.node_type

    return Boolean(provider.accessPolicy) && (type === 'residential')
  }

  render() {
    const { provider,error } = this.props
    const { isWalletEditMode } = this.state
    console.log(this.props)
    return (
      <div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.wallet')}</p>
          <div>
            {/* display saved Wallet */}
            {isWalletEditMode ? (
              <div className={styles.editableField}>
                <TextField placeholder="0x..." name="ethAddress"/>
                <IconButton color="primary">
                  <SaveIcon fontSize="small" onClick={this.handleWalletChange}/>
                </IconButton>
                <IconButton color="secondary" onClick={this.handleToggleWalletEditMode}>
                  <CancelIcon fontSize="small"/>
                </IconButton>
              </div>
            ) : (
              <div className={styles.savedWallet}>
                <p>0x701D8FFF10ce5BbFC05FA6cd0dBF18189bC492eb</p>
                <button onClick={this.handleToggleWalletEditMode}>{trans('app.provider.settings.change')}</button>
              </div>
            )}


            {/* TODO show error if wallet address invalid */}
            {error && (
              <p className={styles.errorText}>{error}</p>
            )}
            {/*<p className={styles.errorText}>{trans('app.provider.settings.wallet.api-error.ts')}</p>*/}
            {/*<p className={styles.helperText}>{trans('app.provider.settings.wallet.helper.text')}</p>*/}
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

export default injectSheet(styles)(compose(
  reduxForm({
    form: 'walletAddress'
  }),
  immutableProps,
)(AirdropWallet))
