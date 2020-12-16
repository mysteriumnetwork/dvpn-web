/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TequilapiError } from 'mysterium-vpn-js'
import _ from 'lodash'

export const parseError = (error: any): string | undefined => {
  if (error instanceof TequilapiError) {
    const tqerr = error as TequilapiError
    const responseData = tqerr.originalResponseData
    return responseData?.message
  }
}

export interface MMNErrors {
  [key: string]: {
    code: string
    message: string
  }[]
}

export const parseMMNError = (error: any): string | undefined => {
  if (error instanceof TequilapiError) {
    const tqerr = error as TequilapiError
    const errors = (tqerr.originalResponseData?.errors || {}) as MMNErrors

    const allErrors = Object.keys(errors).map((k) => _.head(errors[k]))
    const firstError = _.head(allErrors)
    return firstError ? firstError.message : 'Unknown API Error'
  }
}
