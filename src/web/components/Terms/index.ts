import { acceptTermsAction } from '../../../app/pages/Terms/actions'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import { Terms } from '../../../app/pages/Terms/Terms'
import { NAV_DASHBOARD } from '../../web.links'

const mapStateToProps = (state) => ({
  terms: state.terms,
  redirectTo: NAV_DASHBOARD
})

const mapDispatchToProps = (dispatch) => ({
  onAcceptTerms: (value) => {
    dispatch(acceptTermsAction(value))
    dispatch(push(NAV_DASHBOARD))
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(Terms))
