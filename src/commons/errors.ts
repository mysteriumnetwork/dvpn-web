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
  {
    code: 'err_no_tax_state',
    message: 'Please select tax state',
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
    if (this.error instanceof Error) {
      this.errorHuman = error.message
    }
  }

  public human(): string {
    const translation = codeToMessage.find((cm) => cm.code === this.code())

    if (translation) {
      return translation.message
    }

    return this.errorHuman || UNKNOWN_API_ERROR
  }

  public code() {
    return this.errorCode || 'unknown'
  }
}

const parseToastError = (error: any) => {
  toasts.toastError(apiError(error).human())
}

const apiError = (error: any) => new ErrorWrapper(error)

const errors = {
  parseToastError,
  apiError,
}

export default errors
