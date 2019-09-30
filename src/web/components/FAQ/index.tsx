import { Paper, withStyles } from '@material-ui/core'
import React, { FC } from 'react'
import AppHeader from '../AppHeader'

export const FAQPage: FC<any> = (props) => (
  <div>
    <AppHeader/>
    <Paper {...props}/>
  </div>
)

export default withStyles({})(FAQPage)
