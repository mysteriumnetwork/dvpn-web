/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'

export const DEFAULT_OPTIONS: Options = {
  hideLauncher: true,
  alignment: 'left',
  horizontalPadding: 100,
  verticalPadding: 200,
}

interface Options {
  hideLauncher?: boolean
  alignment?: 'left' | 'right'
  verticalPadding?: number
  horizontalPadding?: number
}

export const useIntercom = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.Intercom('onHide', () => setOpen(false))
    // @ts-ignore
    window.Intercom('onShow', () => setOpen(true))
    // @ts-ignore
    window.Intercom('update', {
      hide_default_launcher: DEFAULT_OPTIONS?.hideLauncher ?? false,
      alignment: DEFAULT_OPTIONS?.alignment ?? 'right',
      horizontal_padding: DEFAULT_OPTIONS?.horizontalPadding,
      vertical_padding: DEFAULT_OPTIONS?.verticalPadding,
    })
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
