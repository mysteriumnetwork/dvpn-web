/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { toast as tostify } from 'react-toastify'
import { ErrorToast, InfoToast, SuccessToast, WarningToast } from '../components/Toasts/Toasts'

const toastSuccess = (msg: string) => {
  tostify.success(<SuccessToast message={msg} />)
}
const toastWarning = (msg: string) => {
  tostify.warning(<WarningToast message={msg} />)
}
const toastInfo = (msg: string) => {
  tostify.info(<InfoToast message={msg} />)
}
const toastError = (msg: string) => {
  tostify.error(<ErrorToast message={msg} />)
}

const toasts = {
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
}

export default toasts
