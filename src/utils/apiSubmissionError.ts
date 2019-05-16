import { SubmissionError } from 'redux-form/immutable'
import { ApiError } from '../api/api-error'

export default (formName) => (error: ApiError) => {
  console.log('API_SUBMISSION_ERR',formName, error.message)
  const errors: any = {}
  errors._error = error.message
  throw new SubmissionError(errors)
}
