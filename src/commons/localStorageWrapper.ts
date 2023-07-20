/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { localStorageKeys } from '../constants/local-storage.keys'
import { RootState, store } from '../redux/store'
import { updateNodeUISettingsStore } from '../redux/app.slice'

/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { SETTINGS } = localStorageKeys

const root = (): { [key: string]: any } => {
  return get(SETTINGS) || {}
}

const get = <T>(key: string): T | undefined => {
  const item = localStorage.getItem(key)
  if (!item) {
    return undefined
  }

  return JSON.parse(item) as T
}

const put = <T>(key: string, item: T): T => {
  const json = JSON.stringify(item)
  localStorage.setItem(key, json)
  const stored = get<T>(key)
  if (!stored) {
    throw new Error(`Local Storage write failed for key: ${key}`)
  }
  return stored
}
const getSettings = (key: string): { [key: string]: any } => {
  const settings = get(SETTINGS) as any
  return (settings || {})[key]
}
const writeSettings = <T extends any>(key: string, value: T) => {
  const storageRoot = root()
  put(SETTINGS, { ...storageRoot, [key]: value })
  store.dispatch(updateNodeUISettingsStore({ ...storageRoot, [key]: value }))
}
const selector = <T>(key: string): ((state: RootState) => T | undefined) => {
  return ({ app: { nodeUISettings } }: RootState) => {
    return (nodeUISettings || {})[key]
  }
}
const storage = { get, put, getSettings, writeSettings, selector }

export default storage
