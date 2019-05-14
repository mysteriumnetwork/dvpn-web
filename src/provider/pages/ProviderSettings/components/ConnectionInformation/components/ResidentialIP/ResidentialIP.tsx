import * as React from 'react'
import Checkbox from '../../../../../../../ui-kit/components/Checkbox/Checkbox'

import trans from '../../../../../../../trans'
import { ProviderReducer } from '../../../../../../reducer'

const styles = require('./ResidentialIP.module.scss')

type Props = {
  provider: ProviderReducer

  onChangeResidentialConfirm: (value: boolean) => void
}

const ResidentialIP = (props: Props) => {
  const { onChangeResidentialConfirm, provider } = props

  return (
    <div className={styles.connectionFlexedRow}>
      <div className="app-icons residentialIPIcon" />
      <div className={styles.connectionDetails}>
        <p>
        <span className={styles.textBold}>
          {trans('app.provider.settings.connection.info.residential.ip')}
        </span>
        </p>
        <p className={styles.helperText}>{trans('app.provider.settings.connection.info.helper.text')}</p>
        <span className={styles.checkbox}>
        <Checkbox label={trans('app.provider.settings.connection.info.confirm')}
                  onChange={() => onChangeResidentialConfirm(!provider.residentialConfirm)}
                  checked={provider.residentialConfirm} />
      </span>
      </div>
    </div>
  )
}

export default ResidentialIP
