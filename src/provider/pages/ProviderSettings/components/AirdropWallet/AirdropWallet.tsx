import * as React from 'react'
import AppTextfield from '../../../../../ui-kit/components/AppTextField/AppTextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import trans from '../../../../../trans'
import { ProviderReducer, TrafficOptions } from '../../../../reducer'
import { reduxForm } from 'redux-form/immutable'
import { compose } from 'redux'
import immutableProps from '../../../../../hocs/immutableProps'
import injectSheet from 'react-jss'

const styles = require('./AirdropWallet.module.scss')

type Props = {
  provider: ProviderReducer
  onChangeTrafficOption: (value: string) => void
}

interface State {
  isWalletEditMode: Boolean
}

class AirdropWallet extends React.PureComponent<Props> {
  state: Readonly<State> = {
    isWalletEditMode: true
  }
  handleTrafficChange = event => {
    const { onChangeTrafficOption } = this.props
    onChangeTrafficOption(event.target.value)
  }

  handleWalletEditMode = () => {
    const { isWalletEditMode } = this.state
    this.setState({ isWalletEditMode: !isWalletEditMode })
  }

  get showTrafficOptions() {
    const { provider } = this.props
    const type = provider.originalLocation && provider.originalLocation.node_type

    return Boolean(provider.accessPolicy) && (type === 'residential')
  }

  render() {
    const { provider } = this.props
    const { isWalletEditMode } = this.state
    return (
      <div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.wallet')}</p>
          <div>
            {/* display saved Wallet */}
            {isWalletEditMode ? (
              <div>
                <form>
                  <AppTextfield placeholder="0x..." name="airdropWallet"/>
                </form>
              </div>
            ) : (
              <div className={styles.savedWallet}>
                <p>0x701D8FFF10ce5BbFC05FA6cd0dBF18189bC492eb</p>
                <button onClick={this.handleWalletEditMode}>{trans('app.provider.settings.change')}</button>
              </div>
            )}


            {/* TODO show error if wallet address invalid */}
            <p className={styles.errorText}>{trans('app.provider.settings.wallet.api-error.ts')}</p>
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

export default injectSheet(styles)(compose(
  reduxForm({
    form: 'walletAddress'
  }),
  immutableProps,
)(AirdropWallet))
