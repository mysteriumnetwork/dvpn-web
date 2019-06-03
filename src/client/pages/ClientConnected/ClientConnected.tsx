import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import ConnectedImgBlock from './components/ConnectedImgBlock/ConnectedImgBlock'
import ConnectedInfoBlock from './components/ConnectedInfoBlock/ConnectedInfoBlock'
import BottomBar from './components/BottomBar/BottomBar'
import { ClientReducer } from '../../reducer'
import { DefaultProps } from '../../../types'
import { ConnectionStatus } from 'mysterium-vpn-js'
import { Redirect } from 'react-router'
import { NAV_CLIENT_DASHBOARD } from '../../client.links'
import { stopConnectionStory } from '../../stories'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import _ from 'lodash'

const styles = require('./ClientConnected.module.scss')

type Props = ClientReducer & DefaultProps & {
  onStopConnection?: Function,
}

class ClientConnected extends React.PureComponent<Props> {

  handleDisconnectClick = () => {
    const { onStopConnection } = this.props

    return onStopConnection && onStopConnection()
  }

  render() {
    const { connectionStatus, proposalSelected, location, connectionIp, connectionStatistics } = this.props

    if (!(connectionStatus === ConnectionStatus.CONNECTED || connectionStatus === ConnectionStatus.DISCONNECTING)) {
      return (<Redirect to={NAV_CLIENT_DASHBOARD}/>)
    }

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{trans('app.client.connected')}</h3>
        <div>
          <ConnectedImgBlock proposal={proposalSelected} location={location}/>
          <ConnectedInfoBlock proposal={proposalSelected} ip={connectionIp}/>
        </div>
        <div className={styles.action}>
          <Button color="primary">
            <div className={styles.buttonLabel}>
              <div/>
              <p>{trans('app.client.remove.from.favorites.button')}</p>
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
  identity: _.get(state, 'provider.identity')
})

const mapDispatchToProps = (dispatch) => ({
  onStopConnection: () => stopConnectionStory(dispatch)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientConnected))
