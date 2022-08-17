/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Option } from '../../types/common'
import { default as RSelect } from 'react-select'

interface Props {
  id?: string
  placeholder?: string
  options?: Option[]
  onChange?: (value: Option) => void
  value?: Option
  isClearable?: boolean
}

export const Select = ({ options = [], onChange = () => {}, value, id, isClearable, placeholder }: Props) => {
  return (
    <RSelect<Option>
      id={id}
      value={value}
      options={options}
      isClearable={isClearable}
      placeholder={placeholder}
      onChange={(o) => onChange(o as Option)}
    />
  )
}
