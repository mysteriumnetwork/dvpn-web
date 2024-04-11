/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError, FieldError } from 'mysterium-vpn-js'
import toasts from './toasts'

export const UNKNOWN_API_ERROR = 'Unknown API Error'

const codeToMessage: { code: string; message: string }[] = [
  {
    code: 'err_mmn_registration',
    message: 'Failed to register to my.mystnodes.com',
  },
  {
    code: 'err_no_tax_state',
    message: 'Please select tax state',
  },
]

export class ErrorWrapper {
  private readonly error?: Error
  private readonly errorHuman?: string
  private readonly errorCode?: string
  private readonly errorFields?: Record<string, FieldError>

  constructor(error?: unknown) {
    if (error instanceof APIError) {
      this.errorHuman = error?.human()
      this.errorCode = error?.response.error.code
      this.errorFields = error?.response.error.fields
    } else if (error instanceof Error) {
      this.error = error
      this.errorHuman = error?.message
    } else {
      this.errorCode = UNKNOWN_API_ERROR
      this.errorHuman = error as string
    }
  }

  public human(): string {
    const translation = codeToMessage.find((cm) => cm.code === this.code())

    if (translation) {
      return translation.message
    }

    if (this.errorCode === 'validation_failed' && this.errorFields) {
      const invalidFields = Object.keys(this.errorFields).map((x) => this.errorFields?.[x].message)
      if (invalidFields.length > 0) {
        return invalidFields.join('\n\n')
      }
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

const apiError = (error: unknown) => new ErrorWrapper(error)

const string = (err: unknown): string => {
  if (typeof err === 'object') {
    if (err === null) {
      return 'error - null'
    }

    if (err instanceof Error) {
      return `${err.name}: ${err.message}\n${err.stack}`
    }
    if ('message' in err) {
      return String(err.message)
    }

    return `Unknown object!`
  }
  return String(err)
}

export const errors = {
  parseToastError,
  apiError,
  string,
}

export default errors
