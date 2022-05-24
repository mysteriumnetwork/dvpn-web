/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LockoutButtonInfo } from '../Components/Buttons/types'
import page from './page'
import remoteStorage from './remoteStorage'

export type LockConfig = {
  id: string
  seconds?: number
  refreshPage?: boolean
}

const key = (id: string) => {
  return `lockout_${id}`
}

const lock = (config: LockConfig) => {
  const { id, seconds = 5, refreshPage = false } = config
  remoteStorage.put(key(id), { lockoutUntil: Date.now() + seconds * 1_000 })
  if (refreshPage) {
    page.refreshPage(seconds)
  }
}

const selector = (id: string) => {
  return remoteStorage.selector<LockoutButtonInfo>(key(id))
}

export const lockouts = {
  lock,
  selector,
  buttons: {
    WITHDRAWAL: 'withdrawal',
  },
}
