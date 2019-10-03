import { NAV_PROVIDER_DASHBOARD } from '../../../provider/provider.links'
import { connect } from 'react-redux'
import { Welcome } from './Welcome'

const mapStateToProps = (state) => ({
  terms: state.terms,
  redirectTo: NAV_PROVIDER_DASHBOARD
})

const withConnect = connect(mapStateToProps)

export default withConnect(Welcome)
