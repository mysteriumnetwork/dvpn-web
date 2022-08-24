/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Option } from '../../types/common'
import { default as RSelect } from 'react-select'
import { useTheme } from 'styled-components'

interface Props {
  id?: string
  placeholder?: string
  options?: Option[]
  onChange?: (value: Option) => void
  value?: Option
  isClearable?: boolean
}

export const Select = ({ options = [], onChange = () => {}, value, id, isClearable, placeholder }: Props) => {
  const theme = useTheme()
  return (
    <RSelect<Option>
      styles={{
        singleValue: (p, s) => ({ ...p, color: `${theme.text.colorMain}` }),
        placeholder: (p, s) => ({ ...p, color: `${theme.text.colorSecondary}` }),
        noOptionsMessage: (p, s) => ({ ...p, color: `${theme.text.colorSecondary}` }),
        indicatorSeparator: (p, s) => ({ ...p, width: '0px' }),
        option: (p, s) => {
          return {
            ...p,
            color: s.isSelected || s.isFocused ? theme.dropdown.selectedOrFocusedValueColor : theme.text.colorMain,
            backgroundColor: `${
              s.isSelected
                ? theme.dropdown.selectedValueBackgroundColor
                : s.isFocused
                ? theme.dropdown.focusedValueBackgroundColor
                : theme.dropdown.backgroundColor
            }`,
          }
        },
        control: (p, s) => ({
          ...p,
          backgroundColor: `${theme.dropdown.backgroundColor}`,
          border: theme.dropdown.border,
          borderRadius: '5px',
        }),
        menuList: (p, s) => ({
          ...p,
          backgroundColor: `${theme.dropdown.backgroundColor}`,
          // border: `1px solid ${theme.dropdown.border}`,
          color: `${theme.text.colorMain}`,
        }),
      }}
      id={id}
      value={value}
      options={options}
      isClearable={isClearable}
      placeholder={placeholder}
      onChange={(o) => onChange(o as Option)}
    />
  )
}
