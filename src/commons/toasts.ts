/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
import { parseError } from './errors'

let useSnackbarRef: WithSnackbarProps
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

const toast = (msg: string, variant: VariantType = 'default') => {
  useSnackbarRef.enqueueSnackbar(msg, { variant })
}

const toastSuccess = (msg: string) => {
  toast(msg, 'success')
}
const toastWarning = (msg: string) => {
  toast(msg, 'warning')
}
const toastInfo = (msg: string) => {
  toast(msg, 'info')
}
const toastError = (msg: string) => {
  toast(msg, 'error')
}

const toasts = {
  toast,
  toastSuccess,
  toastWarning,
  toastInfo,
  toastError,
}

export default toasts
