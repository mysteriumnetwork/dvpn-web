import * as React from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded'
import trans from '../../../../../trans'
import ResidentialIP from './components/ResidentialIP/ResidentialIP'
import DataCenterIP from './components/DataCenterIP/DataCenterIP'
import { ProviderReducer } from '../../../../reducer'

const styles = require('./ConnectionInformation.module.scss')

type Props = {
  provider: ProviderReducer

  onChangeResidentialConfirm: (value: boolean) => void
}

const ConnectionInformation = (props: Props) => {
  const { provider, onChangeResidentialConfirm } = props
  const { originalLocation } = provider
  const isResidential = originalLocation && originalLocation.node_type === 'residential'

  return (
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
              <p>
                <span className={styles.textBold}>{originalLocation && originalLocation.ip}</span>
                {originalLocation && originalLocation.country}
              </p>
              <a href="javascript:void(0)">{trans('app.provider.settings.connection.info.change')}</a>
            </div>
          </div>
          {isResidential ? (
            <ResidentialIP provider={provider} onChangeResidentialConfirm={onChangeResidentialConfirm} />
          ) : (
            <DataCenterIP />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ConnectionInformation
