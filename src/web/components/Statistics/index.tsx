import React, { FC } from 'react'
import AppHeader from '../AppHeader'
import ProviderDashboard from '../../../provider/pages/ProviderDashboard'
import { withStyles } from '@material-ui/core'

export const StatisticsPage: FC<any> = (props) => (
  <div>
    <AppHeader/>
    <ProviderDashboard {...props}/>
  </div>
)

export default withStyles({})(StatisticsPage)
