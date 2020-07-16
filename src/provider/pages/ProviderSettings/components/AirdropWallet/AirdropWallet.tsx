import * as React from 'react'
import TextField from '../../../../../app/components/ReduxForm/TextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import Checkbox from '../../../../../ui-kit/components/Checkbox/Checkbox'
import trans from '../../../../../trans'
import { TrafficOptions } from '../../../../reducer'
import styles from './AirdropWallet.module.scss'
import { IconButton, InputAdornment } from "@material-ui/core";
import { Backspace } from "@material-ui/icons";

type Props = {
  formWalletAddressPrefill: any
  formWalletAddressData: any
  change: (field: string, value: any) => void
  submitting: boolean
}

interface PriceRange {
  min: number,
  max: number,
  step: number,
}

const perGiB: PriceRange = {
  min: 0,
  max: 0.5,
  step: 0.01,
}

const perMin: PriceRange = {
  min: 0,
  max: 0.001,
  step: 0.00001,
}

export default class AirdropWallet extends React.PureComponent<Props> {
  handleTrafficChange = (event) => {
    this.props.change('trafficOption', event.target.value)
  }

  handleShaperChange = (event) => {
    this.props.change('shaperEnabled', event.target.checked)
  }

  handleReset = (prop) => (event) => {
    this.props.change(prop, null)
  };

  normalize = (val: any, priceRange: PriceRange) => {
    if (val < priceRange.min) {
      return priceRange.min
    }
    if (val > priceRange.max) {
      return priceRange.max
    }
    return val
  }

  render() {
    const { submitting, formWalletAddressPrefill, formWalletAddressData } = this.props
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
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.service.price')}</p>
          <div className={styles.editableField}>
            <div style={{ marginRight: 6 }}>
              <TextField type="number"
                         inputProps={{ min: perGiB.min, max: perGiB.max, step: perGiB.step }}
                         normalize={val => this.normalize(val, perGiB)}
                         placeholder={formWalletAddressPrefill.providerPriceGiB}
                         name="providerPriceGiB"
                         disabled={submitting}
                         endAdornment={
                           <InputAdornment position="end">
                             <IconButton aria-label="Reset to default" onClick={this.handleReset('providerPriceGiB')}>
                               <Backspace fontSize="small" />
                             </IconButton>
                           </InputAdornment>
                         }
                         className={styles.editableTextFieldHalf}/>
              <p className={styles.helperText}>{trans('app.provider.service.price.gb')}</p>
            </div>
            <div>
              <TextField type="number"
                         inputProps={{ min: perMin.min, max: perMin.max, step: perMin.step }}
                         normalize={val => this.normalize(val, perMin)}
                         name="providerPriceMinute"
                         disabled={submitting}
                         placeholder={formWalletAddressPrefill.providerPriceMinute}
                         endAdornment={
                           <InputAdornment position="end">
                             <IconButton aria-label="Reset to default" onClick={this.handleReset('providerPriceMinute')}>
                               <Backspace fontSize="small" />
                             </IconButton>
                           </InputAdornment>
                         }
                         className={styles.editableTextFieldHalf}/>
              <p className={styles.helperText}>{trans('app.provider.service.price.minute')}</p>
            </div>
          </div>
        </div>
        <h2>{trans('app.provider.settings.advanced')}</h2>
        <div className={styles.flexedRow}>
          <p className={styles.label}>{trans('app.provider.settings.openvpn.port')}</p>
          <div>
            <div className={styles.editableField}>
              <div>
                <TextField type="number" inputProps={{min: "0", max: "65535"}}
                           name="openVpnPort"
                           disabled={submitting}
                           placeholder={formWalletAddressPrefill.openVpnPort}
                           endAdornment={
                             <InputAdornment position="end">
                               <IconButton aria-label="Reset to default" onClick={this.handleReset('openVpnPort')}>
                                 <Backspace fontSize="small" />
                               </IconButton>
                             </InputAdornment>
                           }
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
