import * as React from 'react'
import { InjectedFormProps } from 'redux-form'
import { reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import injectSheet from 'react-jss'
import Button from '../../../ui-kit/components/Button/Button'
import trans from '../../../trans'
import TextField from '../../../app/components/ReduxForm/TextField'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import SuccessIcon from '@material-ui/icons/CheckCircleOutline'
import { passwordChangeStory } from '../../stories'

const styles = require('./Password.module.scss')

type Props = InjectedFormProps & {
  onPasswordChange?: (value: any) => Promise<void>
}

class Settings extends React.PureComponent<Props> {
  handleChange = (data: any) => {
    const { onPasswordChange, initialize } = this.props

    return onPasswordChange && onPasswordChange(data.toJS()).then(() => initialize({}))
  }

  required = (value) => value ? undefined : trans('form.validate.required')

  render() {
    const { handleSubmit, submitting, pristine, invalid, error, submitSucceeded } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleChange)} className={styles.settingsCover}>
        <div className={styles.scrollView}>
          <h1>{trans('app.change.password.title')}</h1>
          <div className={styles.appContent}>
            <div className={styles.flexedRow}>
              <p>{trans('app.auth.username')}</p>
              <div>
                <TextField placeholder="username" name="username" disabled={submitting}
                           className={styles.editableTextField} validate={this.required}/>
              </div>
            </div>
            <div className={styles.flexedRow}>
              <p>{trans('app.change.password.password.old')}</p>
              <div>
                <TextField type="password" placeholder="******" name="oldPassword" disabled={submitting}
                           className={styles.editableTextField} validate={this.required}/>
              </div>
            </div>
            <div className={styles.flexedRow}>
              <p>{trans('app.change.password.password.new')}</p>
              <div>
                <TextField type="password" placeholder="******" name="newPassword" disabled={submitting}
                           className={styles.editableTextField} validate={this.required}/>
              </div>
            </div>
            <div className={styles.flexedRow}>
              <p>&nbsp;</p>
              {(error) && (
                <div className={styles.errorText}>
                  <ErrorIcon/>
                  <span>{error === 'Authorization failed!' ? 'Old password is invalid.' : error}</span>
                </div>
              )}
              {(submitSucceeded && pristine) && (
                <div className={styles.successText}>
                  <SuccessIcon/>
                  <span>{'Password changed!'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <Button type="submit"
                  color="primary"
                  disabled={pristine || invalid || submitting}>
            {trans('submit')}
          </Button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPasswordChange: (value) => passwordChangeStory(dispatch, value),
})

export default injectSheet({})(compose(
  reduxForm({ form: 'changePassword' }),
  connect(undefined, mapDispatchToProps),
  immutableProps,
)(Settings))
