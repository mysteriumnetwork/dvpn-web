/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import styles from './TextField.module.scss'

interface Props {
  id?: string
  type?: 'text' | 'password' | 'number'
  label?: string
  required?: boolean
  autoFocus?: boolean
  onChange?: (value: string) => void
  fluid?: boolean
  className?: string
  value?: string
  maxLength?: number
  inputText?: string
  placeholder?: string
}

export const TextField = ({
  label,
  id,
  type = 'text',
  autoFocus,
  required,
  fluid,
  className,
  value,
  onChange,
  maxLength,
  inputText,
  placeholder,
}: Props) => {
  return (
    <div className={styles.inputHolder}>
      <input
        maxLength={maxLength}
        type={type}
        className={styles.input}
        onChange={(e) => {
          const { value } = e.target
          if (onChange) {
            onChange(value)
          }
        }}
        onWheel={(e) => e.currentTarget.blur()}
        id={id}
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
      />
      <div className={styles.inputText}>{inputText}</div>
    </div>
  )
}
