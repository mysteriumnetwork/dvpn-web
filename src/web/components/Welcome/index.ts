import { connect } from 'react-redux'
import { Welcome } from '../../../app/pages/Welcome/Welcome'
import { NAV_DASHBOARD } from '../../web.links'
import { withStyles } from '@material-ui/core'

const mapStateToProps = (state) => ({
  terms: state.terms,
  redirectTo: NAV_DASHBOARD
})

const withConnect = connect(mapStateToProps)

export default withStyles({})(withConnect(Welcome))
