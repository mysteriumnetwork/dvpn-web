import { NAV_PROVIDER_DASHBOARD } from '../../../provider/provider.links'
import { acceptTermsAction } from './actions'
import { push } from "connected-react-router"
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { Terms } from './Terms'

const mapStateToProps = (state) => ({
  terms: state.terms,
  redirectTo: NAV_PROVIDER_DASHBOARD
})

const mapDispatchToProps = (dispatch) => ({
  onAcceptTerms: (value) => {
    dispatch(acceptTermsAction(value))
    dispatch(push(NAV_PROVIDER_DASHBOARD))
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(Terms))
