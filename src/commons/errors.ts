/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError } from 'mysterium-vpn-js'
import toasts from './toasts'
import storage from './localStorageWrapper'

export const UNKNOWN_API_ERROR = 'Unknown API Error'

const codeToMessage: { code: string; message: string }[] = [
  {
    code: 'err_mmn_registration',
    message: 'Failed to register to mystnodes.com',
  },
]

export class ErrorWrapper {
  private readonly error?: any
  private readonly errorHuman?: string
  private readonly errorCode?: string

  constructor(error?: any) {
    this.error = error

    if (this.error instanceof APIError) {
      this.errorHuman = error.human()
      this.errorCode = error.response.error.code
    }
  }

  public human(): string {
    const translation = codeToMessage.find((cm) => cm.code === this.code())

    if (translation) {
      return translation.message
    }

    return this.errorHuman || errors.parseErrorMessage(this.error)
  }

  public code() {
    return this.errorCode || 'unknown'
  }
}

export const parseErrorMessage = (error: any, defaultMsg?: string): string => {
  return parseTequilApiError(error) || defaultMsg || error?.message || UNKNOWN_API_ERROR
}

export const parseToastError = (error: any) => {
  toasts.toastError(parseErrorMessage(error))
}

const parseTequilApiError = (error: any): string | undefined => {
  if (error instanceof APIError) {
    const tqerr = error as APIError
    return tqerr.human()
  }
}

const apiError = (error: any) => new ErrorWrapper(error as APIError)

const KEY_ERROR_LOG = 'ERROR_LOG'
const ENTRIES_TO_KEEP = 1_000

export interface ErrorEntry {
  tag: string
  message: string
  code: string
  createdAt: number
}

export interface ErrorLog {
  errors: ErrorEntry[]
}

const errorQueue: { tag: string; error: any }[] = []

const logError = (tag: string, error: any) => {
  errorQueue.push({ tag, error })
}

setInterval(() => {
  const item = errorQueue.shift()
  if (!item) {
    return
  }

  const { tag, error } = item
  const wrapped = new ErrorWrapper(error)
  const log = storage.get<ErrorLog>(KEY_ERROR_LOG) || { errors: [] }
  log.errors.push({ tag, message: wrapped.human(), code: wrapped.code(), createdAt: new Date().getTime() })
  storage.put<ErrorLog>(KEY_ERROR_LOG, { errors: log.errors.slice(0, ENTRIES_TO_KEEP) })
}, 1000)

const errors = {
  KEY_ERROR_LOG,
  logError,
  parseErrorMessage,
  parseToastError,
  apiError,
}

export default errors
