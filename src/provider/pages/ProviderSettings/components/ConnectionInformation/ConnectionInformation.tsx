import * as React from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded'
import trans from '../../../../../trans'
import ResidentialIP from './components/ResidentialIP/ResidentialIP'
import DataCenterIP from './components/DataCenterIP/DataCenterIP'
import { ProviderReducer } from '../../../../reducer'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'

const styles = require('./ConnectionInformation.module.scss')

type Props = {
  provider: ProviderReducer
  onChangeResidentialConfirm: (value: boolean) => void
}

const ConnectionInformation = (props: Props) => {
  const { provider, onChangeResidentialConfirm } = props
  const { originalLocation, residentialConfirm } = provider
  const isResidential = originalLocation && originalLocation.node_type === 'residential'
  const isDataCenter = originalLocation && originalLocation.node_type === 'data center'

  return (
    <div>
      <ExpansionPanel defaultExpanded={!residentialConfirm}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <p className={styles.appConnectionTitle}>{trans('app.provider.settings.your.connection.info')}</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.expansionPanelDetails}>
          <div className={styles.connectionFlexedRow}>
            {/*  TODO replace with dynamic country flag */}
            {originalLocation && (
              <FlagIcon code={String(originalLocation.country).toLowerCase()} className={styles.flag}/>
            )}
            <div className={styles.connectionDetails}>
              <p>
                <span className={styles.textBold}>{originalLocation && originalLocation.ip}</span>
                {originalLocation && originalLocation.country}
              </p>
              <button>{trans('app.provider.settings.connection.info.change')}</button>
            </div>
          </div>
          {isResidential ? (
            <ResidentialIP provider={provider} onChangeResidentialConfirm={onChangeResidentialConfirm}/>
          ) : isDataCenter && (
            <DataCenterIP/>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ConnectionInformation
