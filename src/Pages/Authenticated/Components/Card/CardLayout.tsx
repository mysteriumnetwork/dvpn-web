/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './CardLayout.module.scss'

interface Props {
  children?: any
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

export const CardLayout = ({ children, wrap = 'wrap' }: Props) => {
  return (
    <div className={styles.layout} style={{ flexWrap: wrap }}>
      {children}
    </div>
  )
}
