/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly value: string
  readonly className?: string
}

export const Label = ({ value, className }: Props) => {
  return <div className={twMerge('text-blue-850 text-base font-bold', className)}>{value}</div>
}

export default Label
