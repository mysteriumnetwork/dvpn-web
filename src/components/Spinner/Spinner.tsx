/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'

type SpinnerSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

const resolveSize = (size: SpinnerSize): string => {
  switch (size) {
    case 'xs':
      return 'size-3 min-w-3'
    case 'sm':
      return 'size-3.5 min-w-3.5'
    case 'base':
      return 'size-4 min-w-4'
    case 'lg':
      return 'size-5 min-w-5'
    case 'xl':
      return 'size-6 min-w-6'
    case '2xl':
      return 'size-8 min-w-8'
    case '3xl':
      return 'size-12 min-w-12'
    case '4xl':
      return 'size-16 min-w-16'
    case '5xl':
      return 'size-20 min-w-20'
    default:
      return 'size-4 min-w-4'
  }
}

type Props = {
  readonly frozen?: boolean
  readonly size?: SpinnerSize
  readonly className?: string
}

export default function Spinner({ size = 'base', className }: Props) {
  return (
    <div
      className={twMerge(
        resolveSize(size),
        'border-t-transparent border-solid animate-spin rounded-full bg-transparent border-4 border-gray-200 border-b-pink-525',
        className,
      )}
    />
  )
}
