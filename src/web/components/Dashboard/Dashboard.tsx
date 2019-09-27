import { default as React, FC } from 'react'
import { DashboardActions } from './components/DashboardActions/DashboardActions'
import { DashboardHelp } from './components/DashboardHelp/DashboardHelp'
import { DashboardFooter } from './components/DashboardFooter/DashboardFooter'
import { DashboardProps } from './types'

const styles = require('./Dashboard.module.scss')

export const Dashboard: FC<DashboardProps> = (props) => (
  <div className={styles.dashboardCover}>
    <div className={styles.dashboardContainer}>
      <div className={styles.logo}/>
      <DashboardActions {...props}/>
      <DashboardHelp/>
      <DashboardFooter node={props.node}/>
    </div>
  </div>
)
