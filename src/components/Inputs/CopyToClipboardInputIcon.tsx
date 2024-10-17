/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { nanoid } from 'nanoid'
import Clipboard from 'clipboard'
import { CopyIcon } from '../Icons/Icons'
import toasts from '../../commons/toasts'

type Props = {
  readonly text: string
  readonly noToast?: boolean
}

const CopyToClipboardInputIcon = ({ text, noToast }: Props) => {
  const uid = useMemo(() => nanoid(), [])

  useEffect(() => {
    const clipboard = new Clipboard(`.clipboard-${uid}`)
    return () => clipboard.destroy()
  }, [])

  const handleOnClick = () => {
    if (!noToast) {
      toasts.toastSuccess('Copied to clipboard')
    }
  }

  return (
    <div
      className={twMerge('flex items-center justify-center size-6 min-w-6 cursor-pointer', uid)}
      data-clipboard-text={text}
      onClick={handleOnClick}
    >
      <CopyIcon />
    </div>
  )
}

export default CopyToClipboardInputIcon
