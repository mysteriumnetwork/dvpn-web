/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MenuItem, Select as MUISelect } from '@material-ui/core'
import './Select.scss'

export type SelectItemValue = string | number

export interface SelectItem {
  value: SelectItemValue
  name: string
  default?: boolean
}

interface Props {
  id?: string
  items?: SelectItem[]
  onChange?: (value: SelectItemValue) => void
  value?: SelectItemValue
}

export const Select = ({ items = [], onChange = () => {}, value = '', id }: Props) => {
  const mappedItems = items.map((i) => (
    <MenuItem key={i.value} value={i.value}>
      {i.name}
    </MenuItem>
  ))

  return (
    <MUISelect
      id={id}
      value={value}
      onChange={(event) => {
        const { value } = event.target
        onChange(value as number | string)
      }}
    >
      {mappedItems}
    </MUISelect>
  )
}
