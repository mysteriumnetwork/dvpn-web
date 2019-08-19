import { SubmissionError } from 'redux-form/immutable'
import TequilapiError from 'mysterium-vpn-js/lib/tequilapi-error'
import _ from 'lodash'

export default (formName) => (error: TequilapiError) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('API_SUBMISSION_ERR', formName, error.message)
  }

  const errors: any = {}
  const data = _.get(error, '_originalError.response.data')

  if (data && data.errors) {
    Object.keys(data.errors).forEach((key: string) => {
      console.log('xxx', key, data.errors[key])
      errors[key] = Array.from(data.errors[key]).map((item: any) => item.message)
    })
  }

  errors._error = (data && data.message) || error.message

  console.log('xxx', errors)

  throw new SubmissionError(errors)
}
