/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './Select.scss'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

export interface SelectV2Option {
  value: any
  label: any
}

interface Props {
  id?: string
  options?: SelectV2Option[]
  onChange?: (value?: SelectV2Option) => void
  value?: any
  placeholder?: string
}

export const SelectV2 = ({ options = [], onChange = () => {}, value, id, placeholder }: Props) => {
  return (
    <Autocomplete
      disableClearable
      id={id}
      value={value}
      options={options}
      onChange={(event, value) => {
        onChange(value)
      }}
      noOptionsText={'Select...'}
      getOptionLabel={(o) => o?.label}
      renderOption={(o: SelectV2Option) => <div>{o.label}</div>}
      renderInput={(params) => <TextField {...params} label={placeholder || 'Choose'} />}
    />
  )
}
