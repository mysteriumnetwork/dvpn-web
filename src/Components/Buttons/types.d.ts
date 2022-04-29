/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MouseEventHandler } from 'react'

export type LockoutButtonInfo = {
  lockoutUntil: number
}

export type LockoutButtonProps = ButtonProps & {
  id: string
  lockoutSeconds?: number
  lockoutAfterOnClick?: boolean
  refreshPage?: boolean
}

export type ButtonProps = {
  isLoading?: boolean
  className?: string
  children?: any
  onClick?: MouseEventHandler
  disabled?: boolean
  extraStyle?: 'outline' | 'filled' | 'gray' | 'outline-primary'
  type?: 'button' | 'submit' | 'reset' | undefined
  autoFocus?: boolean
  icon?: JSX.Element
}
