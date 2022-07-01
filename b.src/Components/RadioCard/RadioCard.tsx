/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './RadioCard.module.scss'
import classNames from 'classnames'

export interface Item {
  value: any
  label: string
}

interface Props {
  items?: Item[]
  value?: any
  onChange?: (value: any) => void
}

export const RadioCard = ({ items = [], value, onChange = () => {} }: Props) => {
  const mapped = items?.map((i) => (
    <div
      className={classNames(styles.item, value === i.value ? styles.active : '')}
      onClick={() => onChange(i.value)}
      key={i.value}
    >
      {i.label}
    </div>
  ))
  return <div className={styles.radio}>{mapped}</div>
}
