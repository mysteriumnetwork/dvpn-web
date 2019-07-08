import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectedImgBlock from './components/ConnectedImgBlock/ConnectedImgBlock'
import ConnectedInfoBlock from './components/ConnectedInfoBlock/ConnectedInfoBlock'
import BottomBar from './components/BottomBar/BottomBar'
import { ClientState } from '../../reducer'
import { DefaultProps } from '../../../types'
import { ConnectionStatus } from 'mysterium-vpn-js'
import { Redirect } from 'react-router'
import { NAV_CLIENT_DASHBOARD } from '../../client.links'
import { stopConnectionStory } from '../../stories'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import _ from 'lodash'
import { Proposal } from 'mysterium-vpn-js'
import { addFavoriteProposalsAction, removeFavoriteProposalsAction } from '../../actions';
const styles = require('./ClientConnected.module.scss')

type Props = ClientState & DefaultProps & {
  onStopConnection?: Function,
  onAddFavoriteProposals: Function,
  onRemoveFavoriteProposals: Function,
  favoriteProposals: Proposal[]
}

class ClientConnected extends React.PureComponent<Props> {
  handleAddProposalsClick = () => this.props.onAddFavoriteProposals(this.props.proposalSelected)

  handleRemoveProposalsClick = () => this.props.onRemoveFavoriteProposals(this.props.proposalSelected)

  handleDisconnectClick = () => {
    const { onStopConnection } = this.props

    return onStopConnection && onStopConnection()
  }

  render() {
    const { connectionStatus, proposalSelected, location, connectionIp, favoriteProposals, connectionStatistics } = this.props

    if (!(connectionStatus === ConnectionStatus.CONNECTED || connectionStatus === ConnectionStatus.DISCONNECTING)) {
      return (<Redirect to={NAV_CLIENT_DASHBOARD}/>)
    }

    const isAddedToFavorites = Array.isArray(favoriteProposals) && favoriteProposals.find(item => item.providerId === (proposalSelected && proposalSelected.providerId))


    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{trans('app.client.connected')}</h3>
        <div>
          <ConnectedImgBlock proposal={proposalSelected} location={location}/>
          <ConnectedInfoBlock proposal={proposalSelected} ip={connectionIp}/>
        </div>
        <div className={styles.action}>
          <Button onClick={isAddedToFavorites ? this.handleRemoveProposalsClick : this.handleAddProposalsClick} color="primary">
            <div className={styles.buttonLabel}>
              <p>
                {trans(isAddedToFavorites
                  ? 'app.client.remove.from.favorites.button'
                  : 'app.client.add.to.favorites.button')}
              </p>
            </div>
          </Button>
          <Button color="secondary"
                  disabled={connectionStatus !== ConnectionStatus.CONNECTED}
                  onClick={this.handleDisconnectClick}>
            {trans('app.client.disconnect.button')}
          </Button>
        </div>
        <BottomBar statistics={connectionStatistics}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {}),
  location: _.get(state, 'provider.originalLocation'),
  identity: _.get(state, 'provider.identity'),
  favoriteProposals: _.get(state,'client.favoriteProposals')
})

const mapDispatchToProps = (dispatch) => ({
  onStopConnection: () => stopConnectionStory(dispatch),
  onAddFavoriteProposals: (proposal) => dispatch(addFavoriteProposalsAction(proposal)),
  onRemoveFavoriteProposals: (proposal) => dispatch(removeFavoriteProposalsAction(proposal)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientConnected))
