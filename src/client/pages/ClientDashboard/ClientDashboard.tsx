import * as React from 'react'

import SideBar from './components/SideBar/SideBar'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionTable from './components/ConnectionTable/ConnectionTable'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import {
  applyFilterStory,
  destroyClientDashboardStory,
  initClientDashboardStory,
  selectProposalStory,
  startConnectionStory
} from '../../stories'
import { ClientState } from '../../reducer'
import { Proposal } from '../../../api/data/proposal'
import { DefaultProps } from '../../../types'
import _ from 'lodash'
import { ConnectionStatus, Identity, Location as OriginalLocation } from 'mysterium-vpn-js'
import { NAV_CLIENT_CONNECTED, NAV_CLIENT_CONNECTING } from '../../client.links'
import { Redirect } from 'react-router'

const styles = require('./ClientDashboard.module.scss')

type Props = ClientState & DefaultProps & {
  onInit?: Function
  onDestroy?: Function
  onSelectConnection?: Function
  onSelectFilter?: Function,
  onStartConnection?: Function,
  location: OriginalLocation
  identity: Identity
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
    const {
      onSelectConnection,
      onSelectFilter,
      onStartConnection,
      proposalSelected,
      proposalsCount,
      proposalsFavoritesCount,
      proposalsByTypeCounts,
      proposalsByCountryCounts,
      filter,
      location,
      identity,
      connectionStatus,
    } = this.props

    if (connectionStatus === ConnectionStatus.CONNECTING) {
      return (<Redirect to={NAV_CLIENT_CONNECTING}/>)
    }

    if (connectionStatus === ConnectionStatus.CONNECTED || connectionStatus === ConnectionStatus.DISCONNECTING) {
      return (<Redirect to={NAV_CLIENT_CONNECTED}/>)
    }

    return (
      <div className={styles.dashboardCover}>
        <SideBar proposals={proposalsCount}
                 favorites={proposalsFavoritesCount}
                 byCountry={proposalsByCountryCounts}
                 byType={proposalsByTypeCounts}
                 filter={filter}
                 onChange={onSelectFilter}/>
        <ConnectionTable proposals={this.filteredProposals}
                         selected={proposalSelected}
                         onSelect={onSelectConnection}/>
        <BottomBar location={location}
                   proposal={proposalSelected}
                   identity={identity}
                   onConnect={onStartConnection}
                   disabled={connectionStatus !== ConnectionStatus.NOT_CONNECTED}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {}),
  location: _.get(state, 'provider.originalLocation'),
  identity: _.get(state, 'provider.identity')
})

const mapDispatchToProps = (dispatch) => ({
  onInit: () => initClientDashboardStory(dispatch),
  onDestroy: () => destroyClientDashboardStory(dispatch),
  onSelectConnection: (proposal) => selectProposalStory(dispatch, proposal),
  onSelectFilter: (filter) => applyFilterStory(dispatch, filter),
  onStartConnection: (proposal, identity) => startConnectionStory(dispatch, proposal, identity)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientDashboard))
