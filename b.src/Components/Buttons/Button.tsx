/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { MouseEventHandler } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './Button.scss'

interface Props {
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

const Button = ({ isLoading, extraStyle, className, children, onClick, type, disabled, autoFocus, icon }: Props) => {
  const classNames = `btn p-r-10 p-l-10 ${className || ''} btn--${extraStyle || 'filled'}`

  return (
    <button
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      className={classNames}
      autoFocus={autoFocus}
      style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
    >
      {isLoading ? (
        <CircularProgress
          className={['outline', 'outline-primary'].includes(`${extraStyle}`) ? 'loader-outline' : 'loader'}
          disableShrink
        />
      ) : (
        children
      )}
      {icon && icon}
    </button>
  )
}

export default Button
