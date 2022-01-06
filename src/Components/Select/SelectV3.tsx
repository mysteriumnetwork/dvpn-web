/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Select from 'react-select'
import styles from './Select.module.scss'

export interface Option {
  value: string | number
  label: string
}

interface Props {
  id?: string
  placeholder?: string
  options?: Option[]
  onChange?: (value: Option | Option[]) => void
  value?: Option | Option[]
  isMulti?: boolean
  isClearable?: boolean
}

export const SelectV3 = ({
  options = [],
  onChange = () => {},
  value,
  id,
  isClearable,
  isMulti,
  placeholder,
}: Props) => {
  return (
    <div className={styles.select}>
      {isMulti ? (
        <Select<Option, true>
          id={id}
          placeholder={placeholder}
          value={value}
          options={options}
          isClearable={isClearable}
          isMulti
          onChange={(o) => onChange(o as Option[])}
        />
      ) : (
        <Select<Option>
          id={id}
          value={value}
          options={options}
          isClearable={isClearable}
          onChange={(o) => onChange(o as Option)}
        />
      )}
    </div>
  )
}
