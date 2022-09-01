/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { localStorageKeys } from '../constants/local-storage.keys'
import { useAppSelector } from '../commons/hooks'
import complexActions from '../redux/complex.actions'

const DESKTOP_OPTIONS = {
  hide_default_launcher: true,
  alignment: 'left',
  horizontal_padding: 100,
  vertical_padding: 200,
}

const MOBILE_OPTIONS = {
  hide_default_launcher: true,
  alignment: 'right',
  horizontal_padding: 20,
  vertical_padding: 20,
}

export const initIntercom = () => {
  const intercomUserId = localStorage.getItem(localStorageKeys.INTERCOM_USER_ID)
  if (intercomUserId !== null && intercomUserId !== '') {
    // @ts-ignore
    window.Intercom('boot', {
      anonymous_id: intercomUserId,
      ...DESKTOP_OPTIONS,
    })
  } else {
    // Load intercom chat
    // @ts-ignore
    window.Intercom('boot', {
      app_id: 'h7hlm9on',
      ...DESKTOP_OPTIONS,
    })
  }
}

export const updateIntercom = (mode: 'mobile' | 'desktop') => {
  // @ts-ignore
  window.Intercom('update', {
    ...(mode === 'mobile' ? MOBILE_OPTIONS : DESKTOP_OPTIONS),
  })
}

export const useIntercom = () => {
  const open = useAppSelector(({ app }) => app.chatOpened)

  useEffect(() => {
    // @ts-ignore
    window.Intercom('onHide', () => complexActions.setChatOpened(false))
    // @ts-ignore
    window.Intercom('onShow', () => complexActions.setChatOpened(true))
  }, [])

  // @ts-ignore
  const show = () => window.Intercom('show')
  // @ts-ignore
  const hide = () => window.Intercom('hide')

  const reportIssue = async (cb: (userId?: string) => Promise<any>) => {
    // @ts-ignore
    const userId = window.Intercom('getVisitorId')
    await cb(userId)
    // @ts-ignore
    window.Intercom('update')
    // @ts-ignore
    window.Intercom('showMessages')
  }

  return { show, hide, open, reportIssue }
}
