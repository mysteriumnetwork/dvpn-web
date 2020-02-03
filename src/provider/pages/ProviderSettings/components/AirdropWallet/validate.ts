import isValidAddress from '../../../../../utils/isValidAddress'
import isValidEmail from '../../../../../utils/isValidEmail'
import trans from '../../../../../trans'
import isValidPort from "../../../../../utils/isValidPort";

export default (d) => {
  const data = (d && d.toJS && d.toJS()) || d
  const err = {
    ethAddress: '',
    email: '',
    openVpnPort: '',
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

  if (data.openVpnPort) {
    if (!isValidPort(data.openVpnPort)) {
      err.openVpnPort = trans('error.invalid.port')
    }
  }

  return err
}
