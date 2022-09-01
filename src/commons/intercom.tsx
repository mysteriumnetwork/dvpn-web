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

export const useIntercom = (options: Options = DEFAULT_OPTIONS) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.Intercom('onHide', () => setOpen(false))
    // @ts-ignore
    window.Intercom('onShow', () => setOpen(true))
    // @ts-ignore
    window.Intercom('update', {
      hide_default_launcher: options?.hideLauncher ?? false,
      alignment: options?.alignment ?? 'right',
      horizontal_padding: options?.horizontalPadding,
      vertical_padding: options?.verticalPadding,
    })
  }, [options?.hideLauncher, options?.alignment, options?.hideLauncher, options?.verticalPadding])

  // @ts-ignore
  const show = () => window.Intercom('show')
  // @ts-ignore
  const hide = () => window.Intercom('hide')

  return { show, hide, open }
}
