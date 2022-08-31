/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO this should be part of api module not commons
import { tequila } from '../api/tequila'
import { RootState, store } from '../redux/store'
import complexActions from '../redux/complex.actions'

const { api } = tequila

const ROOT_KEY = 'node-ui'

const root = (): { [key: string]: any } => {
  return store.getState().app.config.data[ROOT_KEY] || {}
}

const put = async <T extends any>(key: string, value: T) => {
  const storageRoot = root()
  await api.updateUserConfig({ data: { [ROOT_KEY]: { ...storageRoot, [key]: value } } })
  await complexActions.refreshStoreConfig()
}

const selector = <T>(key: string): ((state: RootState) => T | undefined) => {
  return ({ app: { config } }: RootState) => {
    return (config.data[ROOT_KEY] || {})[key]
  }
}

/**
 * uses node config as storage
 *
 * values can be retrieved with useSelect(this.selector(key))
 */
const remoteStorage = {
  put,
  selector,
}

export default remoteStorage
