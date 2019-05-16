import isValidAddress from '../../../../../utils/isValidAddress'
import trans from '../../../../../trans'

export default (d) => {
  const data = (d && d.toJS && d.toJS()) || d
  const err = {
    ethAddress: ''
  }
  if (data.ethAddress && !isValidAddress(data.ethAddress)) {
    err.ethAddress = trans('error.address.format')
  }

  return err

}
