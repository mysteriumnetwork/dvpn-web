/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError } from 'mysterium-vpn-js'
import toasts from './toasts'

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

  constructor(error: any) {
    this.error = error

    if (error instanceof APIError) {
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

const errors = {
  parseErrorMessage,
  parseToastError,
  apiError,
}

export default errors
