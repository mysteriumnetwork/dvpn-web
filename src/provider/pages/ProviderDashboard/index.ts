import { ServiceInfo } from 'mysterium-vpn-js'
import { startVpnServerStory, stopVpnServerStory } from '../../stories'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { ProviderDashboard } from './ProviderDashboard'

const mapStateToProps = (state) => ({
  provider: state.provider || {}
})

const mapDispatchToProps = (dispatch) => ({
  onStopVpnServer: (services: ServiceInfo[]) => stopVpnServerStory(dispatch, services),
  onStartVpnServer: (provider) => startVpnServerStory(dispatch, provider),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(withConnect(ProviderDashboard))
