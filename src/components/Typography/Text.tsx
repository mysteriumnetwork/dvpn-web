/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly value: string | ReactNode
  readonly className?: string
}

export const Text = ({ value, className }: Props) => {
  return <div className={twMerge('text-blue-850 text-sm font-normal', className)}>{value}</div>
}

export default Text
