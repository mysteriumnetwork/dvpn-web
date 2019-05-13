import * as React from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded'
import trans from '../../../../../trans'
import ResidentialIP from './components/ResidentialIP/ResidentialIP'
import DataCenterIP from './components/DataCenterIP/DataCenterIP'

const styles = require('./ConnectionInformation.scss')

const ConnectionInformation = () => (
  <div>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <p className={styles.appConnectionTitle}>{trans('app.provider.settings.your.connection.info')}</p>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.connectionFlexedRow}>
          {/*  TODO replace with dynamic country flag */}
          <div className="flag-icon" />
          <div className={styles.connectionDetails}>
            {/* TODO replace with dynamic info */}
            <p>
              <span className={styles.textBold}>88.17.13.176</span>
              (Lithuania)
            </p>
            <a href="/">{trans('app.provider.settings.connection.info.change')}</a>
          </div>
        </div>
        {/* markup for Residential IP */}
        <ResidentialIP />
        {/* markup for Data Center IP */}
        <DataCenterIP />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
)

export default ConnectionInformation
