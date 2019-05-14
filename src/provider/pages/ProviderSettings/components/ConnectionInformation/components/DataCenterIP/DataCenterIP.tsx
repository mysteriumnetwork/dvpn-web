import * as React from 'react'
import trans from '../../../../../../../trans'

const styles = require('./DataCenterIP.module.scss')

const DataCenterIP = () => (
  <div className={styles.connectionFlexedRow}>
    <div className="app-icons dataCenterIPIcon" />
    <div className={styles.connectionDetails}>
      <p>
        <span className={styles.textBold}>
          {trans('app.provider.settings.connection.info.data.center.ip')}
        </span>
      </p>
      <p className={styles.helperText}>
        {trans('app.provider.settings.connection.info.helper.text.data.center')}
      </p>
      <a href="javascript:void(0)">{trans('app.provider.settings.connection.info.change')}</a>
    </div>
  </div>
)

export default DataCenterIP
