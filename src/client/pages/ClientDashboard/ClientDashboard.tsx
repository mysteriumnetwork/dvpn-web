import * as React from 'react'

import SideBar from './components/SideBar/SideBar'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionTable from './components/ConnectionTable/ConnectionTable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { applyFilterStory, initClientDashboardStory, selectProposalStory } from '../../stories'
import { ClientReducer } from '../../reducer'
import { Proposal } from '../../../api/data/proposal'
import { DefaultProps } from '../../../types'

const styles = require('./ClientDashboard.module.scss')

type Props = ClientReducer & DefaultProps & {
  onInit?: Function
  onDestroy?: Function
  onSelectConnection?: Function
  onSelectFilter?: Function
}

class ClientDashboard extends React.PureComponent<Props> {
  constructor(props, context) {
    super(props, context)

    props.onInit && props.onInit()
  }

  componentWillUnmount() {
    const { onDestroy } = this.props

    return onDestroy && onDestroy()
  }

  get filteredProposals(): Proposal[] {
    return this.props.proposals || []
  }

  render() {
    console.log('ClientDashboard:', this.filteredProposals)

    const { onSelectConnection, onSelectFilter, proposalSelected, proposalsCount, proposalsFavoritesCount, proposalsByTypeCounts, proposalsByCountryCounts } = this.props

    return (
      <div className={styles.dashboardCover}>
        <SideBar proposals={proposalsCount}
                 favorites={proposalsFavoritesCount}
                 byCountry={proposalsByCountryCounts}
                 byType={proposalsByTypeCounts}
                 onChange={onSelectFilter}/>
        <ConnectionTable proposals={this.filteredProposals}
                         selected={proposalSelected}
                         onSelect={onSelectConnection}/>
        <BottomBar/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {})
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initClientDashboardStory(dispatch),
  onSelectConnection: (proposal) => selectProposalStory(dispatch, proposal),
  onSelectFilter: (filter) => applyFilterStory(dispatch, filter)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientDashboard))
