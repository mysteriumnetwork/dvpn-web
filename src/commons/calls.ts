/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import toasts from './toasts'
import errors from './errors'

export interface Msg {
  success?: string
  error?: string
}

const tryTo = async <T>(fn: () => Promise<T>, msg?: Msg): Promise<T | undefined> => {
  try {
    const value = await fn()
    msg?.success && toasts.toastSuccess(msg?.success)
    return value
  } catch (err: any) {
    errors.parseToastError(err)
  }
}

const calls = {
  tryTo,
}

export default calls
