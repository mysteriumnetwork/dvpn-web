/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import { SupportIssueResponse } from 'mysterium-vpn-js'
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
  const showNewMessage = (message: string) => window.Intercom('showNewMessage', message)
  // @ts-ignore
  const hide = () => window.Intercom('hide')

  const reportIssue = ({ message, email, identity, nodeCountry, ipType, ip }: SupportIssueResponse) => {
    // @ts-ignore
    window.Intercom('update', {
      anonymous_email: email,
      node_country: nodeCountry,
      ip_type: ipType,
      ip,
      node_identity: identity,
      user_role: 'provider',
    })
    showNewMessage(message)
  }

  return { show, showNewMessage, hide, open, reportIssue }
}
