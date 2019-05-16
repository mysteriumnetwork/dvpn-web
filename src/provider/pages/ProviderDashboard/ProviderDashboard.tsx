import * as React from 'react'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import BottomBar from './components/BottomBar/BottomBar'
import ConnectionInfo from './components/ConnectionInfo/ConnectionInfo'
import UsersList from './components/UsersList/UsersList'
import { DefaultProps } from '../../../types'
import { ProviderReducer } from '../../reducer'
import { getFormValues } from 'redux-form'
import { stopVpnServerStory } from '../../stories'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Service } from '../../../api/data/service'
import { Redirect } from 'react-router'
import { NAV_PROVIDER_SETTINGS } from '../../provider.links'

const styles = require('./ProviderDashboard.module.scss')

type Props = DefaultProps & {
  provider: ProviderReducer,

  onStopVpnServer: (service: Service) => void
}

class ProviderDashboard extends React.PureComponent<Props> {

  get service(): Service {
    return (this.props.provider && this.props.provider.startedService) || {}
  }

  handleDisconnect = () => {
    const { onStopVpnServer } = this.props

    return onStopVpnServer(this.service)
  }

  render() {
    const { provider } = this.props

    if (!(provider.startedService && provider.startedService.id)) return (<Redirect to={NAV_PROVIDER_SETTINGS} />)

    return (<div className={styles.dashboardCover}>
      <div className={styles.dashboardHeader}>
        <h4>
          <p>9{trans('app.node.running.users.connected')}</p>
          <p>
            9{trans('app.node.running.successful.connections')}
            <span>/</span>
            11{trans('app.node.running.attempted')}
          </p>
        </h4>
        <Button disabled={provider.startedServicePending} onClick={this.handleDisconnect} variant="contained"
                color="secondary">
          Disconnect
        </Button>
      </div>
      <ConnectionInfo provider={provider} />
      <UsersList provider={provider} />
      <BottomBar provider={provider} />
    </div>)
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider || {}, formWalletAddressData: getFormValues('walletAddress')(state)
})

const mapDispatchToProps = (dispatch) => ({
  onStopVpnServer: (service: Service) => stopVpnServerStory(dispatch, service)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ProviderDashboard))

