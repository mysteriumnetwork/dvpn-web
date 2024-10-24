/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LegacyRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from '../Spinner/Spinner'

type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonVariant = 'primary' | 'secondary' | 'primary-outlined' | 'secondary-outlined' | 'outlined'
export type ButtonShape = 'default' | 'circle' | 'square'
export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonProps = {
  readonly label?: string
  readonly type?: ButtonType
  readonly onClick?: () => void
  readonly icon?: ReactNode
  readonly className?: string
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly shape?: ButtonShape
  readonly fluid?: boolean
  readonly active?: boolean
  readonly loading?: boolean
  readonly disabled?: boolean
  readonly noBorder?: boolean
  readonly ref?: LegacyRef<HTMLButtonElement>
}

const styles = (variant: ButtonVariant, disabled?: boolean, active?: boolean): string => {
  const disabledClasses = 'bg-white-25 border-white-25 text-gray-250'

  switch (variant) {
    case 'primary':
      return twMerge(
        'border',
        !disabled && 'bg-pink-525 hover:bg-pink-550 text-white',
        !disabled && 'border-pink-525 hover:border-pink-550',
        !disabled && 'active:bg-pink-575 active:border-pink-575',
        !disabled && active && 'bg-pink-575 border-pink-575',
        disabled && disabledClasses,
      )
    case 'secondary':
      return twMerge(
        'border',
        !disabled && 'bg-blue-850 hover:bg-blue-750 text-white',
        !disabled && 'border-blue-850 hover:border-blue-750',
        !disabled && 'active:bg-blue-550 active:border-blue-550',
        !disabled && active && 'bg-blue-550 border-blue-550',
        disabled && disabledClasses,
      )
    case 'primary-outlined':
      return twMerge(
        'border-1.5 border-solid bg-none bg-white',
        !disabled && 'text-pink-525 border-pink-525 hover:border-pink-550 hover:text-pink-550 hover:bg-white-250',
        !disabled && 'active:bg-pink-75 active:text-pink-575 active:border-pink-575',
        !disabled && active && 'bg-pink-75 text-pink-575 border-pink-575',
        disabled && disabledClasses,
      )
    case 'secondary-outlined':
      return twMerge(
        'border-1.5 border-solid bg-none bg-white',
        !disabled && 'text-blue-850 border-blue-850 hover:border-blue-750 hover:text-blue-750 hover:bg-white-50',
        !disabled && 'active:bg-white-75',
        !disabled && active && 'bg-white-75',
        disabled && 'bg-white-25 border-gray-250 text-gray-250',
      )
    case 'outlined':
      return twMerge(
        'border-1.5 border-solid bg-none bg-white',
        !disabled && 'text-gray-550 border-white-25 hover:border-gray-125 hover:text-gray-750 hover:bg-white-125',
        !disabled && 'active:bg-white-25 active:border-gray-150 active:text-gray-850',
        !disabled && active && 'bg-white-25 border-gray-150 text-gray-850',
        disabled && disabledClasses,
      )
    default:
      return ''
  }
}

const shapeAndSizeStyles = (shape: ButtonShape, size: ButtonSize, fluid?: boolean): string => {
  switch (shape) {
    case 'default':
      return twMerge(
        'rounded-lg px-6',
        fluid && 'w-full',
        !fluid && 'w-fit',
        size === 'sm' && 'h-[42px] text-sm',
        size === 'md' && 'h-[50px] text-base',
      )
    case 'circle':
      return twMerge(
        'rounded-full',
        size === 'sm' && 'size-9 min-w-9',
        size === 'md' && 'size-[50px] min-w-[50px]',
        size === 'lg' && 'size-20 min-w-20',
      )
    case 'square':
      return twMerge('rounded-lg size-10 min-w-10 text-base')
    default:
      return ''
  }
}

export const Button = ({
  label,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'md',
  shape = 'default',
  loading,
  active,
  disabled,
  fluid,
  className,
  icon,
  noBorder,
  ref,
}: ButtonProps) => (
  <button
    ref={ref}
    type={type}
    onClick={!(disabled || loading) ? onClick : undefined}
    aria-disabled={disabled || loading}
    className={twMerge(
      'relative flex items-center justify-center font-bold border-solid box-border',
      'whitespace-nowrap transition-colors duration-200',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      loading && 'cursor-progress',
      styles(variant, disabled || loading, active),
      shapeAndSizeStyles(shape, size, fluid),
      noBorder && 'border-0',
      className,
    )}
  >
    {icon && (
      <div className={twMerge(label && 'mr-2', 'size-3/5 flex flex-col justify-center items-center')}>{icon}</div>
    )}
    {label}
    {loading && <Spinner size="sm" className="absolute inline-block right-1.5" />}
  </button>
)

export default Button
