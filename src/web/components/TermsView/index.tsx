import React, { FC } from 'react'
import AppHeader from '../AppHeader'
import { withStyles } from '@material-ui/core'
import Terms from '../../../app/pages/Terms'

export const StatisticsPage: FC<any> = (props) => (
  <div>
    <AppHeader/>
    <Terms {...props} view/>
  </div>
)

export default withStyles({})(StatisticsPage)
