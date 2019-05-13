import * as React from 'react'
import AppTextfield from '../../../../../ui-kit/components/AppTextField/AppTextField'
import RadioButton from '../../../../../ui-kit/components/RadioButton/RadioButton'
import trans from '../../../../../trans'

const styles = require('./AirdropWallet.module.scss')

const AirdropWallet = () => (
  <div>
    <div className={styles.flexedRow}>
      <p>{trans('app.provider.settings.wallet')}</p>
      <div>
        {/* display saved Wallet */}
        <div className={styles.savedWallet}>
          <p>0x701D8FFF10ce5BbFC05FA6cd0dBF18189bC492eb</p>
          <a href="/">{trans('app.provider.settings.change')}</a>
        </div>
        <AppTextfield placeholder="0x..." name="airdropWallet" />
        {/* TODO show error if wallet address invalid */}
        <p className={styles.errorText}>{trans('app.provider.settings.wallet.error')}</p>
        <p className={styles.helperText}>{trans('app.provider.settings.wallet.helper.text')}</p>
      </div>
    </div>
    <div className={styles.flexedRow}>
      <p>{trans('app.provider.settings.traffic')}</p>
      {/* TODO Add Radio controls */}
      <div>
        <div className={styles.radioForm}>
          <RadioButton label={trans('app.provider.settings.verified.partner.traffic')} />
          <p className={styles.helperText}>{trans('app.provider.settings.safe.option')}</p>
        </div>
        <div className={styles.radioForm}>
          <RadioButton label={trans('app.provider.settings.all.traffic')} />
        </div>
      </div>
    </div>
  </div>
)

export default AirdropWallet
