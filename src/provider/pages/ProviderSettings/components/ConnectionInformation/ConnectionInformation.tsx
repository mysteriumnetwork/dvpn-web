import * as React from 'react'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded'
import trans from '../../../../../trans'
import ResidentialIP from './components/ResidentialIP/ResidentialIP'
import DataCenterIP from './components/DataCenterIP/DataCenterIP'
import { ProviderState } from '../../../../reducer'
import FlagIcon from '../../../../../ui-kit/components/FlagIcon'
import { isDataCenterProvider, isResidentialProvider } from '../../../../helpers'

const styles = require('./ConnectionInformation.module.scss')

type Props = {
  provider: ProviderState
  onChangeResidentialConfirm: (value: boolean) => void
}

const ConnectionInformation = (props: Props) => {
  const { provider, onChangeResidentialConfirm } = props
  const { originalLocation, residentialConfirm } = provider

  return (
    <div>
      <ExpansionPanel defaultExpanded={!residentialConfirm}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <p className={styles.appConnectionTitle}>{trans('app.provider.settings.your.connection.info')}</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.expansionPanelDetails}>
          <div className={styles.connectionFlexedRow}>
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
          {isResidentialProvider(provider) ? (
            <ResidentialIP provider={provider} onChangeResidentialConfirm={onChangeResidentialConfirm}/>
          ) : isDataCenterProvider(provider) && (
            <DataCenterIP/>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default ConnectionInformation
