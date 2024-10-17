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

export const ErrorMessage = ({ value, className }: Props) => {
  return <div className={twMerge('text-red text-xs font-normal whitespace-pre-line', className)}>{value}</div>
}

export default ErrorMessage
