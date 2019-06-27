import { SubmissionError } from 'redux-form/immutable'
import TequilapiError from 'mysterium-vpn-js/lib/tequilapi-error'

export default (formName) => (error: TequilapiError) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('API_SUBMISSION_ERR', formName, error.message)
  }
  const errors: any = {}
  errors._error = error.message
  throw new SubmissionError(errors)
}
