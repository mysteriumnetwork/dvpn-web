/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { localStorageKeys } from '../constants/local-storage.keys'

export const loadIntercomCookie = () => {
  const intercomUserId = localStorage.getItem(localStorageKeys.INTERCOM_USER_ID)
  if (intercomUserId !== null && intercomUserId !== '') {
    // @ts-ignore
    window.Intercom('boot', {
      anonymous_id: intercomUserId,
    })
  } else {
    // Load intercom chat
    // @ts-ignore
    window.Intercom('boot', {
      app_id: 'h7hlm9on',
    })
  }
}
