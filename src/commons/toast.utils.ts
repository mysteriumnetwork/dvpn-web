/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'

let useSnackbarRef: WithSnackbarProps
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export const toast = (msg: string, variant: VariantType = 'default') => {
  useSnackbarRef.enqueueSnackbar(msg, { variant })
}

export const toastSuccess = (msg: string) => {
  toast(msg, 'success')
}
export const toastWarning = (msg: string) => {
  toast(msg, 'warning')
}
export const toastInfo = (msg: string) => {
  toast(msg, 'info')
}
export const toastError = (msg: string) => {
  toast(msg, 'error')
}
