/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'
import Text from '../Typography/Text'

export type BubbleIndicatorVariant = 'success' | 'disabled' | 'error' | 'warning'

type Props = {
  readonly label: string
  readonly variant: BubbleIndicatorVariant
  readonly onClick?: () => void
  readonly className?: string
}

export const BubbleIndicator = ({ label, variant, onClick, className }: Props) => {
  const classes = twMerge(
    'flex size-3.5 min-w-3.5 rounded-full',
    variant === 'success' && 'bg-green-550',
    variant === 'disabled' && 'bg-purple-300',
    variant === 'error' && 'bg-red-300',
    variant === 'warning' && 'bg-orange-200',
    onClick && 'cursor-pointer',
  )

  return (
    <div className="flex items-center gap-3">
      <div className={twMerge(classes, className)} onClick={onClick}></div>
      <Text className="text-gray-550" value={label} />
    </div>
  )
}

export default BubbleIndicator
