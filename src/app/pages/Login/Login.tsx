import * as React from 'react'
import trans from '../../../trans'
import styles from './Login.module.scss'
import { DefaultProps } from '../../../types'
import injectSheet from 'react-jss'
import { compose } from 'redux'
import { InjectedFormProps } from 'redux-form'
import { reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'
import immutableProps from '../../../hocs/immutableProps'
import TextField from '../../../app/components/ReduxForm/TextField'
import Button from '../../../ui-kit/components/Button/Button'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import { Redirect } from 'react-router'
import { loginStory } from '../../../settings/stories'
import _ from 'lodash'
import { NAV_TERMS } from '../../app.links'

type Props = DefaultProps & InjectedFormProps & {
  onSubmit?: Function
  startedServices?: any
}

class Login extends React.PureComponent<Props> {
  handleChange = (data: any) => {
    const { onSubmit, startedServices } = this.props

    return onSubmit && onSubmit(data.toJS(), startedServices)
  }

  required = (value) => value ? undefined : trans('form.validate.required')

  render() {
    const { handleSubmit, submitting, pristine, invalid, error, submitSucceeded } = this.props

    if (submitSucceeded) {
      return <Redirect to={NAV_TERMS}/>
    }

    return (
      <form className={styles.appCover} onSubmit={handleSubmit(this.handleChange)}>
        <div className={styles.appBgPattern}/>

        <div className={styles.scrollView}>
          <div className={styles.appContent}>
            <div className={styles.logo}/>
            <h1>{trans('app.onboarding.welcome')}</h1>
            <h4>{trans('app.onboarding.subtitle')}</h4>
          </div>
          <div className={styles.appFormContent}>
            <div className={styles.flexedRow}>
              <p>{trans('app.auth.username')}</p>
              <div>
                <TextField placeholder="username" name="username" disabled={submitting}
                           className={styles.editableTextField} validate={this.required}/>
              </div>
            </div>
            <div className={styles.flexedRow}>
              <p>{trans('app.auth.password')}</p>
              <div>
                <TextField type="password" placeholder="******" name="password" disabled={submitting}
                           className={styles.editableTextField} validate={this.required}/>
              </div>
            </div>
          </div>
          <div className={styles.appContent}/>
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.messageRow}>
            {(error) && (
              <div className={styles.errorText}>
                <ErrorIcon/>
                <span>{error}</span>
              </div>
            )}
          </div>
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

const mapStateToProps = (state) => ({
  startedServices: _.get(state, 'provider.startedServices') || []
})
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (value, startedServices) => loginStory(dispatch, value, startedServices),
})

export default injectSheet({})(compose(
  reduxForm({ form: 'auth-login' }),
  connect(mapStateToProps, mapDispatchToProps),
  immutableProps,
)(Login))
