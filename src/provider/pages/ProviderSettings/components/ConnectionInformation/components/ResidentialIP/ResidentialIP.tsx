import * as React from 'react'
import Checkbox from '../../../../../../../ui-kit/components/Checkbox/Checkbox'

import trans from '../../../../../../../trans'

const styles = require('./ResidentialIP.module.scss')

const ResidentialIP = () => (
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
        <Checkbox label={trans('app.provider.settings.connection.info.confirm')} />
      </span>
    </div>
  </div>
)

export default ResidentialIP
