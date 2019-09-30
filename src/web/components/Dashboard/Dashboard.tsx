import { default as React, PureComponent } from 'react'
import { DashboardActions } from './components/DashboardActions/DashboardActions'
import { DashboardHelp } from './components/DashboardHelp/DashboardHelp'
import { DashboardFooter } from './components/DashboardFooter/DashboardFooter'
import { DashboardProps } from './types'

const styles = require('./Dashboard.module.scss')

export class Dashboard extends PureComponent<DashboardProps> {
  componentDidMount() {
    this.props.onInit && this.props.onInit()
  }

  componentWillUnmount() {
    this.props.onDestroy && this.props.onDestroy()
  }

  render() {
    return (
      <div className={styles.dashboardCover}>
        <div className={styles.dashboardContainer}>
          <div className={styles.logo}/>
          <DashboardActions {...this.props}/>
          <DashboardHelp/>
          <DashboardFooter node={this.props.node}/>
        </div>
      </div>
    )
  }
}
