import { NAV_TERMS } from '../../app.links'
import _ from 'lodash'
import { loginStory } from '../../stories'
import { compose } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import immutableProps from '../../../hocs/immutableProps'
import { Login } from './Login'
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
