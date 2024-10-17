/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { ButtonSize, ButtonVariant } from './Button'

export type LockoutButtonInfo = {
  lockoutUntil: number
}

export type ButtonProps = {
  disabled?: boolean
  label: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  rounded?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
  className?: string
}
