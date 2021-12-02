/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { parseTequilApiError, parseMMNError, UNKNOWN_API_ERROR } from './error.utils'
import { toastError, toastSuccess } from './toast.utils'

export interface Msg {
  success?: string
  error?: string
}

export const callWithToast = async <T>(fn: () => Promise<T>, msg?: Msg): Promise<T> => {
  try {
    const result = await fn()
    if (msg?.success && msg?.success.length > 0) {
      toastSuccess(msg.success)
    }
    return result
  } catch (err) {
    if (msg?.error && msg?.error.length > 0) {
      toastError(msg.error)
    } else {
      toastError(parseMMNError(err) || parseTequilApiError(err) || err?.message || msg?.error || UNKNOWN_API_ERROR)
    }
    return err
  }
}
