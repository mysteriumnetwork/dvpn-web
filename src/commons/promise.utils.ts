/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { parseError, parseMMNError } from './error.utils'
import toast from './toast.utils'

export interface Msg {
  success?: string
  error?: string
}

export const callWithSnack = async <T>(fn: () => Promise<T>, msg?: Msg): Promise<T> => {
  try {
    const result = await fn()
    if (msg?.success && msg?.success.length > 0) {
      toast.success(msg.success)
    }
    return result
  } catch (err) {
    if (msg?.error && msg?.error.length > 0) {
      toast.error(parseMMNError(err) || parseError(err) || msg.error)
    } else {
      toast.error(parseMMNError(err) || parseError(err) || 'Unknown Error')
    }
    return err
  }
}
