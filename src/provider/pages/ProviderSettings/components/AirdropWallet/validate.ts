import isValidEmail from '../../../../../utils/isValidEmail'
import isValidAddress from '../../../../../utils/isValidAddress'
import trans from '../../../../../trans'

export default (d) => {
  const data = (d && d.toJS && d.toJS()) || d
  const err = {
    ethAddress: '',
    email: ''
  }
  console.log(d)
  if (!isValidAddress(data.ethAddress)) {
    err.ethAddress = trans('error.address.format')
  }
  if (!isValidEmail(data.email)) {
    err.email = trans('error.email.format')
  }

  return err

}
