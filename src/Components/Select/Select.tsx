/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { default as RSelect } from 'react-select'
import styles from './Select.module.scss'
import { Option } from '../../types/common'

interface Props {
  id?: string
  placeholder?: string
  options?: Option[]
  onChange?: (value: Option | Option[]) => void
  value?: Option | Option[]
  isMulti?: boolean
  isClearable?: boolean
}

/**
 * @deprecated use Select or MultiSelect from Inputs
 * @param options
 * @param onChange
 * @param value
 * @param id
 * @param isClearable
 * @param isMulti
 * @param placeholder
 * @constructor
 */
export const Select = ({ options = [], onChange = () => {}, value, id, isClearable, isMulti, placeholder }: Props) => {
  return (
    <div className={styles.select}>
      {isMulti ? (
        <RSelect<Option, true>
          id={id}
          placeholder={placeholder}
          value={value}
          options={options}
          isClearable={isClearable}
          isMulti
          onChange={(o) => onChange(o as Option[])}
        />
      ) : (
        <RSelect<Option>
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
