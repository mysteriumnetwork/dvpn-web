/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { store } from '../redux/store'
import { configs } from '../commons/config'
import FEATURES from '../commons/features'
import storage from '../commons/localStorageWrapper'
import { ErrorWrapper } from '../commons/errors'

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
  const config = store.getState().app.config
  const isEnabled = configs.isFeatureEnabled(config, FEATURES.ERROR_LOGGING.name)

  if (!isEnabled) {
    return
  }
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

const buildLogError = (tag: string) => (error: any) => {
  logError(tag, error)
  return Promise.reject(error)
}

const errorInterceptors = {
  KEY_ERROR_LOG,
  buildLogError,
}

export default errorInterceptors
