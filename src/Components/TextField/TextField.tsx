/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField as MUITextField } from '@material-ui/core'
import './TextField.scss'

interface Props {
  password?: boolean
  onChange: (value: string) => void
  value?: string | number
  name?: string
  disabled?: boolean
  id?: string
  placeholder?: string
  defaultValue?: unknown
  multiline?: boolean
  rows?: number
  className?: string
  type?: 'text' | 'number' | 'password'
}

export const TextField = ({
  id,
  placeholder,
  onChange: handleChange,
  value,
  disabled,
  defaultValue,
  multiline,
  rows = 1,
  name,
  className,
  type = 'text',
}: Props) => {
  return (
    <MUITextField
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      onChange={(e) => {
        const { value } = e.target
        handleChange(value)
      }}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      autoComplete={type === 'password' ? '' : 'off'}
      className={className || 'default-text-field'}
      multiline={multiline}
    />
  )
}
