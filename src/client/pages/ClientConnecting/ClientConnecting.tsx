import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { NAV_CLIENT_DASHBOARD } from '../../client.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Loader from '../../../ui-kit/components/Loader/Loader'
import ConnectionImgBlock from './components/ConnectionImgBlock/ConnectionImgBlock'
import ConnectionInfoBlock from './components/ConnectionInfoBlock/ConnectionInfoBlock'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { ConnectionStatus } from 'mysterium-vpn-js'
import { ClientReducer } from '../../reducer'
import { DefaultProps } from '../../../types'

const styles = require('./ClientConnecting.module.scss')

type Props = ClientReducer & DefaultProps & {}

class ClientConnecting extends React.PureComponent<Props> {
  render() {

    const { connectionStatus } = this.props

    if (connectionStatus !== ConnectionStatus.CONNECTING) {
      return (<Redirect to={NAV_CLIENT_DASHBOARD}/>)
    }

    return (
      <div className={styles.root}>
        <h3 className={styles.title}>{trans('app.client.connecting.title')}</h3>
        <div>
          <ConnectionImgBlock/>
          <ConnectionInfoBlock/>
        </div>
        <Loader/>
        <div className={styles.action}>
          <Link to={NAV_CLIENT_DASHBOARD}>
            <Button color="primary">{trans('app.client.cancel.button')}</Button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...(state.client || {})
})

const mapDispatchToProps = (dispatch) => ({})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ClientConnecting))
