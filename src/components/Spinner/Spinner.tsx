/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'

type SpinnerSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

const sizeStyleMap: Record<SpinnerSize, string> = {
  xs: 'size-3 min-w-3',
  sm: 'size-3.5 min-w-3.5',
  base: 'size-4 min-w-4',
  lg: 'size-5 min-w-5',
  xl: 'size-6 min-w-6',
  '2xl': 'size-8 min-w-8',
  '3xl': 'size-12 min-w-12',
  '4xl': 'size-16 min-w-16',
  '5xl': 'size-20 min-w-20',
}

const resolveSize = (size: SpinnerSize): string => {
  return sizeStyleMap[size] || 'size-4 min-w-4'
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
