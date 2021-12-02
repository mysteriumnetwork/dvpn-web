/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
import styles from './Radio.module.scss'

export interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  checked?: string
  options?: Option[]
  onChange?: (value: string) => void
}

export const Radio = ({ options = [], checked, onChange = () => {} }: Props) => {
  const [checkedValue, setCheckedValue] = useState<string>()
  useEffect(() => {
    if (checked) {
      setCheckedValue(checked)
    }
  }, [checked])

  const onValueChange = (value: string) => {
    setCheckedValue(value)
    onChange(value)
  }

  return (
    <div className={styles.radio}>
      {options?.map((o) => (
        <div key={o.value} className={styles.group}>
          <input
            className={styles.input}
            type="radio"
            checked={o.value === checkedValue}
            id={o.value}
            value={o.value}
            onChange={(e) => {
              const value = e.target.value
              onValueChange(value)
            }}
            disabled={o.disabled}
          />
          <div className={styles.label}>{o.label}</div>
        </div>
      ))}
    </div>
  )
}
