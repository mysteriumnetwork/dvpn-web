import * as React from 'react'

import SideBar from './components/SideBar/SideBar'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionTable from './components/ConnectionTable/ConnectionTable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { initClientDashboardStory } from '../../stories'
import { ClientReducer } from '../../reducer'
import { Proposal } from '../../../api/data/proposal'
import { DefaultProps } from '../../../types'

const styles = require('./ClientDashboard.module.scss')

type Props = ClientReducer & DefaultProps & {
  onInit: Function
}

class ClientDashboard extends React.PureComponent<Props> {
  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  get proposals(): Proposal[] {
    const { proposals } = this.props

    return proposals || []
  }

  get proposalsCount(): number {
    return this.proposals.length
  }

  get proposalsFaCount(): number {
    return 0
  }

  render() {
    console.log('ClientDashboard:', this.props)

    return (
      <div className={styles.dashboardCover}>
        <SideBar proposals={this.proposalsCount}/>
        <ConnectionTable/>
        <BottomBar/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {})
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initClientDashboardStory(dispatch)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientDashboard))
