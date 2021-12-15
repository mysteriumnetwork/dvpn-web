/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './CardLayout.module.scss'

interface Props {
  children?: any
}

export const CardLayout = ({ children }: Props) => {
  return <div className={styles.layout}>{children}</div>
}
