import { RootState } from '../../../rootState.type'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { AppHeader } from './AppHeader'

const mapStateToProps = (state: RootState): any => ({
  routerLocation: _.get(state, 'router.location.pathname'),
  startedServices: Boolean(state.provider && state.provider.startedServices && state.provider.startedServices.length),
  connectionStatus: Boolean(state.client && state.client.connectionStatus),
})

export default withStyles({})(connect(mapStateToProps)(AppHeader))
