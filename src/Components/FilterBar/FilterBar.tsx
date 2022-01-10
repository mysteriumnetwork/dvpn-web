/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './FilterBar.module.scss'

interface FilterItemProps {
  label: string
  component: JSX.Element
}

export const FilterItem = ({ label, component }: FilterItemProps) => {
  return (
    <div className={styles.item}>
      <p className={styles.itemLabel}>{label}</p>
      <div className={styles.itemComponent}>{component}</div>
    </div>
  )
}

interface FilterBarProps {
  children?: JSX.Element | JSX.Element[]
  right?: JSX.Element | JSX.Element[]
}

export const FilterBar = ({ children, right }: FilterBarProps) => {
  return (
    <div className={styles.bar}>
      {children}
      {right && <div className="flex-grow" />}
      <div className={styles.barRight}>{right}</div>
    </div>
  )
}
