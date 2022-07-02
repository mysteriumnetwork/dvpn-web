/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { toast as rtoast } from 'react-toastify'
import { ReactNode } from 'react'

const toastSuccess = (msg: ReactNode) => {
  rtoast.success(msg)
}
const toastWarning = (msg: ReactNode) => {
  rtoast.warning(msg)
}
const toastInfo = (msg: ReactNode) => {
  rtoast.info(msg)
}
const toastError = (msg: ReactNode) => {
  rtoast.error(msg)
}

const toasts = {
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
}

export default toasts
