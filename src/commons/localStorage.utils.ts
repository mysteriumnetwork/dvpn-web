/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

const storage = { get, put }

export default storage
