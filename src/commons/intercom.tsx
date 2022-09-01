/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'

interface Options {
  hideLauncher?: boolean
}

export const useIntercom = (options?: Options) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.Intercom('onHide', () => setOpen(false))
    // @ts-ignore
    window.Intercom('onShow', () => setOpen(true))
    // @ts-ignore
    window.Intercom('update', {
      hide_default_launcher: options?.hideLauncher ?? false,
    })
  }, [options?.hideLauncher])

  // @ts-ignore
  const show = () => window.Intercom('show')
  // @ts-ignore
  const hide = () => window.Intercom('hide')

  return { show, hide, open }
}
