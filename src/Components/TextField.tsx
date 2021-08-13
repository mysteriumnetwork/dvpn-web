/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextField as MUITextField } from '@material-ui/core'
import React from 'react'

interface Props {
  password?: boolean
  handleChange: (a: any) => (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  stateName: string
  disabled?: boolean
  id?: string
  placeholder?: string
  defaultValue?: unknown
  multiline?: boolean
  rows?: number
}

export const TextField = ({
  id,
  placeholder,
  password,
  handleChange,
  value,
  disabled,
  defaultValue,
  stateName,
  multiline,
  rows = 1,
}: Props): JSX.Element => {
  return (
    <MUITextField
      id={id || 'field-' + stateName}
      name={stateName ? stateName : id}
      type={password ? 'password' : 'text'}
      disabled={disabled}
      onChange={handleChange(stateName)}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      autoComplete={password ? '' : 'off'}
      className="default-text-field"
      multiline={multiline}
    />
  )
}
