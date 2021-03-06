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
}

const Button = ({
  isLoading,
  extraStyle,
  className,
  children,
  onClick,
  type,
  disabled,
  autoFocus,
}: Props): JSX.Element => {
  const classNames = `btn p-r-30 p-l-30 ${className || ''} btn--${extraStyle || 'filled'}`

  return (
    <button disabled={disabled || isLoading} type={type} onClick={onClick} className={classNames} autoFocus={autoFocus}>
      {isLoading ? <CircularProgress className="loader" disableShrink /> : children}
    </button>
  )
}

export default Button
