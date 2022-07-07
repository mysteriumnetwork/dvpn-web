/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { toast as tostify } from 'react-toastify'
import { ReactNode } from 'react'

const toastSuccess = (msg: ReactNode) => {
  tostify.success(msg)
}
const toastWarning = (msg: ReactNode) => {
  tostify.warning(msg)
}
const toastInfo = (msg: ReactNode) => {
  tostify.info(msg)
}
const toastError = (msg: ReactNode) => {
  tostify.error(msg)
}

const toasts = {
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
}

export default toasts
