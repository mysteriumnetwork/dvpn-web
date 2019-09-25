import * as React from 'react'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import trans from '../../../../../trans'
import { ProviderState, TrafficOptions } from '../../../../reducer'
import { reduxForm } from 'redux-form/immutable'
import { compose } from 'redux'
import immutableProps from '../../../../../hocs/immutableProps'
import { submit } from '../../../../../utils/reduxForm'
import { InjectedFormProps } from 'redux-form'
import validate from './validate'
import styles from './AirdropWallet.module.scss'
import { withStyles } from '@material-ui/core'

type Props = InjectedFormProps & {
  confirmLoading: boolean,
  state: { isWalletEditMode: boolean }
  provider: ProviderState
  onInitForm: (submitForm: () => void) => void
  onSaveSettings: Function
  formWalletAddressData?: any
  onSetState?: (data: Object) => void
}

class AirdropWallet extends React.PureComponent<Props> {
  state = {
    initialized: false,
    confirmed: false
  }

  componentDidMount() {
    const { onInitForm } = this.props
    onInitForm(this.submitForm)
  }

  componentDidUpdate() {
    const {
      initialize,
      provider,
    } = this.props

    const {
      initialized,
    } = this.state

    const payout: any = provider.payout ? { ...provider.payout } : {}

    if (!initialized && payout && payout.loaded) {
      delete payout.loading
      delete payout.loaded

      initialize({ ...payout, trafficOption: provider.trafficOption })

      this.setState({
        initialized: true,
      })
    }
  }

  submitForm = () => {
    const { onSaveSettings, formWalletAddressData, provider } = this.props
    submit(this.props, () => onSaveSettings({
      ...formWalletAddressData,
      id: provider.identity.id,
      payout: provider.payout
    }))
  }

  handleTrafficChange = (event) => {
    const { change } = this.props
    change('trafficOption', event.target.value)
  }

  // handleResendConfirmation = () => {
  //   ///TODO
  //   this.setState({ confirmed: true, })
  // }

  render() {
    const { submitting, /*confirmLoading,*/ formWalletAddressData, provider } = this.props
    // const { confirmed } = this.state //TODO
    const trafficOptionValue = (formWalletAddressData && formWalletAddressData.trafficOption)
      ? formWalletAddressData.trafficOption
      : provider.trafficOption

    console.log('**', {submitting, formWalletAddressData, provider})

    return (
      <div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.wallet')}</p>

          <div>
            <div className={styles.editableField}>
              <TextField placeholder="0x..." name="ethAddress" disabled={submitting}
                         className={styles.editableTextField}/>
            </div>
            <p className={styles.helperText}>
              {trans('app.provider.settings.wallet.helper.text')} <a
              href="http://metamask.io/" target="_blank" rel="noopener noreferrer" className="underlined purple">
              {trans('app.provider.settings.wallet.helper.text.link')}
            </a>
            </p>
          </div>
        </div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.email')}</p>
          <div>
            <div className={styles.editableField}>
              <TextField
                placeholder={trans('app.provider.settings.email')}
                name="email"
                disabled={submitting}
                className={styles.editableTextField}
              />
            </div>
            {/*<p className={styles.helperText}>*/}
            {/*  <span className={confirmed ? styles.successText : styles.errorText}>*/}
            {/*    {confirmed ? trans('confirmed') : trans('unconfirmed')}*/}
            {/*  </span>. {!confirmed && !confirmLoading && (<span onClick={this.handleResendConfirmation}>*/}
            {/*    {trans('app.provider.settings.email.resend.confirmation.text')}*/}
            {/*  </span>)}*/}
            {/*</p>*/}
            <p className={styles.helperText}>{trans('app.provider.settings.email.helper.text')}</p>
          </div>
        </div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.referral.code')}</p>
          <div>
            <div className={styles.editableField}>
              <TextField placeholder="ABC123" name="referralCode" disabled={submitting}
                         className={styles.editableTextField}/>
            </div>
          </div>
        </div>
        <div className={styles.flexedRow}>
          <p>{trans('app.provider.settings.traffic')}</p>
          <div>
            <div className={styles.radioForm}>
              <RadioButton label={trans('app.provider.settings.verified.partner.traffic')}
                           value={TrafficOptions.SAFE}
                           onChange={this.handleTrafficChange}
                           checked={trafficOptionValue === TrafficOptions.SAFE}/>
              <p className={styles.helperText}>{trans('app.provider.settings.safe.option')}</p>
            </div>
            <div className={styles.radioForm}>
              <RadioButton label={trans('app.provider.settings.all.traffic')}
                           value={TrafficOptions.ALL}
                           onChange={this.handleTrafficChange}
                           checked={trafficOptionValue === TrafficOptions.ALL}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles({})(compose(
  reduxForm({
    form: 'walletAddress',
    validate,
  }),
  immutableProps,
)(AirdropWallet))
