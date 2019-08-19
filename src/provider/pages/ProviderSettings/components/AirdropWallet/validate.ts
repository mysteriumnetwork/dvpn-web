import isValidAddress from '../../../../../utils/isValidAddress'
import isValidEmail from '../../../../../utils/isValidEmail'
import trans from '../../../../../trans'

export default (d) => {
  const data = (d && d.toJS && d.toJS()) || d
  const err = {
    ethAddress: '',
    email: '',
  }

  if (data.ethAddress) {
    if (!isValidAddress(data.ethAddress)) {
      err.ethAddress = trans('error.address.format')
    } else if (!data.email) {
      err.email = trans('error.cannot.be.blank')
    }
  }

  if (data.email) {
    if (!isValidEmail(data.email)) {
      err.email = trans('error.invalid.email')
    }
  }

  return err
}
