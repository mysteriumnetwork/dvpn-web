import { connect } from 'react-redux'
import { Dashboard } from './Dashboard'
import { ServiceInfo } from 'mysterium-vpn-js'
import { startVpnServerStory, stopVpnServerStory } from '../../../provider/stories'
import withEvents from '../../../hocs/withEvents'

const mapStateToProps = (state) => ({
  provider: state.provider || {},
  node: state.app.node
})

const mapDispatchToProps = (dispatch) => ({
  onStopVpnServer: (services: ServiceInfo[]) => stopVpnServerStory(dispatch, services),
  onStartVpnServer: (provider) => startVpnServerStory(dispatch, provider),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withEvents(withConnect(Dashboard))
