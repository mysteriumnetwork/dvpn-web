import _ from 'lodash'
import { compose } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import immutableProps from '../../../hocs/immutableProps'
import { Login } from '../../../app/pages/Login/Login'
import { loginStory } from '../../../app/stories'
import { NAV_TERMS } from '../../web.links'
import { withStyles } from '@material-ui/core'

const mapStateToProps = (state) => ({
  redirectTo: NAV_TERMS,
  startedServices: _.get(state, 'provider.startedServices') || []
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value, startedServices) => loginStory(dispatch, value, startedServices),
})

export default withStyles({})(compose(
  reduxForm({ form: 'auth-login' }),
  connect(mapStateToProps, mapDispatchToProps),
  immutableProps,
)(Login))
