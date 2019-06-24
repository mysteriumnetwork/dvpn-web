import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { NAV_CLIENT_CONNECTED, NAV_CLIENT_DASHBOARD } from '../../client.links'
import trans from '../../../trans'
import Loader from '../../../ui-kit/components/Loader/Loader'
import ConnectionImgBlock from './components/ConnectionImgBlock/ConnectionImgBlock'
import ConnectionInfoBlock from './components/ConnectionInfoBlock/ConnectionInfoBlock'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { ConnectionStatus, Identity, Location as OriginalLocation } from 'mysterium-vpn-js'
import { ClientState } from '../../reducer'
import { DefaultProps } from '../../../types'
import _ from 'lodash'

const styles = require('./ClientConnecting.module.scss')

type Props = ClientState & DefaultProps & {
  location: OriginalLocation
  identity: Identity
}

class ClientConnecting extends React.PureComponent<Props> {
  render() {

    const { connectionStatus, proposalSelected,location } = this.props

    if (connectionStatus === ConnectionStatus.CONNECTED) {
      return (<Redirect to={NAV_CLIENT_CONNECTED}/>)
    }

    if (connectionStatus !== ConnectionStatus.CONNECTING) {
      return (<Redirect to={NAV_CLIENT_DASHBOARD}/>)
    }

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{trans('app.client.connecting.title')}</h3>
        <div>
          <ConnectionImgBlock proposal={proposalSelected} location={location}/>
          <ConnectionInfoBlock proposal={proposalSelected}/>
        </div>
        <Loader/>
        {/*<div className={styles.action}>*/}
        {/*  <Link to={NAV_CLIENT_DASHBOARD}>*/}
        {/*    <Button color="primary">{trans('app.client.cancel.button')}</Button>*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {}),
  location: _.get(state, 'provider.originalLocation'),
  identity: _.get(state, 'provider.identity')
})

const mapDispatchToProps = (dispatch) => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientConnecting))
