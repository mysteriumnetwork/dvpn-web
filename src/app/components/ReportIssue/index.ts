import withEvents from '../../../hocs/withEvents'
import { ReportIssue } from './ReportIssue'
import _ from 'lodash'
import { sendReportIssueStory } from '../../stories'
import { compose } from 'redux'
import { reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import immutableProps from '../../../hocs/immutableProps'
import trans from '../../../trans'
import isValidEmail from '../../../utils/isValidEmail'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'

const mapStateToProps = (state) => ({
  pending: _.get(state, 'app.reportIssuePending', false)
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value) => sendReportIssueStory(dispatch, value),
})

const validate = (value) => {
  const data: Issue = (value && value.toJS && value.toJS()) || value

  return {
    description: (data.description && data.description !== '') ? null : trans('error.cannot.be.blank'),
    email: (data.email && !isValidEmail(data.email) ? trans('error.invalid.email') : ''),
  }
}

export default withEvents(compose(
  reduxForm<Issue>({ form: 'report-issue', validate }),
  connect(mapStateToProps, mapDispatchToProps),
  immutableProps,
)(ReportIssue))

