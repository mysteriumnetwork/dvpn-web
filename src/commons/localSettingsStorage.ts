/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RootState, store } from '../redux/store'
import { updateNodeUISettingsStore } from '../redux/app.slice'
import { localStorageKeys } from '../constants/local-storage.keys'
import localStorage from './localStorageWrapper'

const { SETTINGS } = localStorageKeys

const root = (): { [key: string]: any } => {
  return store.getState().app.nodeUISettings || {}
}

const get = (key: string): { [key: string]: any } => {
  const settings = localStorage.get(SETTINGS) as any
  return (settings || {})[key]
}

const put = <T extends any>(key: string, value: T) => {
  const storageRoot = root()
  localStorage.put(SETTINGS, { ...storageRoot, [key]: value })
  store.dispatch(updateNodeUISettingsStore({ ...storageRoot, [key]: value }))
}

const selector = <T>(key: string): ((state: RootState) => T | undefined) => {
  return ({ app: { nodeUISettings } }: RootState) => {
    return (nodeUISettings || {})[key]
  }
}

const localSettingsStorage = {
  get,
  put,
  selector,
}
export default localSettingsStorage
