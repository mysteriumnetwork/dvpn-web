import * as React from 'react'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import Checkbox from '../../../../../ui-kit/components/Checkbox/Checkbox'
import trans from '../../../../../trans'
import { TrafficOptions } from '../../../../reducer'
import styles from './AirdropWallet.module.scss'

type Props = {
  formWalletAddressData: any
  change: (field: string, value: any) => void;
  submitting: boolean
}

export default class AirdropWallet extends React.PureComponent<Props> {
  handleTrafficChange = (event) => {
    const { change } = this.props
    change('trafficOption', event.target.value)
  }

  handleShaperChange = (event) => {
    const { change } = this.props
    change('shaperEnabled', event.target.checked)
  }

  render() {
    const { submitting, formWalletAddressData } = this.props
    const trafficOptionValue = (formWalletAddressData && formWalletAddressData.trafficOption)
    const shaperEnabledValue = Boolean(formWalletAddressData && formWalletAddressData.shaperEnabled)

    return (
      <div>
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.settings.wallet')}</p>

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
          <p className={styles.label}>{trans('app.provider.settings.email')}</p>
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
          <p className={styles.label}>{trans('app.provider.settings.referral.code')}</p>
          <div>
            <div className={styles.editableField}>
              <TextField placeholder="ABC123" name="referralCode" disabled={submitting}
                         className={styles.editableTextField}/>
            </div>
          </div>
        </div>
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.settings.traffic')}</p>
          <div>
            <div className={styles.radioForm}>
              <RadioButton label={trans('app.provider.settings.verified.partner.traffic')}
                           value={TrafficOptions.SAFE}
                           onChange={this.handleTrafficChange}
                           checked={trafficOptionValue === TrafficOptions.SAFE}
                           disabled={submitting}/>
              <p className={styles.helperText}>{trans('app.provider.settings.safe.option')}</p>
            </div>
            <div className={styles.radioForm}>
              <RadioButton label={trans('app.provider.settings.all.traffic')}
                           value={TrafficOptions.ALL}
                           onChange={this.handleTrafficChange}
                           checked={trafficOptionValue === TrafficOptions.ALL}
                           disabled={submitting}/>
            </div>
          </div>
        </div>
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.settings.limits')}</p>

          <div>
            <div className={styles.radioForm}>
              <Checkbox label={trans('app.provider.settings.shaper.enabled', { limit: '5Mbps' })}
                        checked={shaperEnabledValue}
                        onChange={this.handleShaperChange}
                        disabled={submitting}/>
            </div>
          </div>
        </div>
        <h2>{trans('app.provider.settings.advanced')}</h2>
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.settings.openvpn.port')}</p>
          <div>
            <div className={styles.editableField}>
              <div>
                <TextField placeholder="0" name="openVpnPort" disabled={submitting}
                           className={styles.editableTextField}/>
              </div>
            </div>
            <p className={styles.helperText}>{trans('app.provider.settings.openvpn.port.help')}</p>
          </div>
        </div>
      </div>
    )
  }
}
