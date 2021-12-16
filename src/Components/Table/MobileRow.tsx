/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './MobileRow.module.scss'
import classNames from 'classnames'

interface Props {
  topLeft?: string
  topLeftSub?: string
  topRight?: string
  topRightSub?: string
  bottomLeft?: string
  bottomMiddle?: string
  bottomRight?: string
}

export const MobileRow = ({
  topLeft,
  topRight,
  topLeftSub,
  bottomLeft,
  bottomRight,
  bottomMiddle,
  topRightSub,
}: Props) => {
  return (
    <div className={styles.row}>
      <div className={styles.rowHeader}>
        <div className={styles.rowHeaderTitle}>{topLeft}</div>
        <div
          className={
            topRight ? classNames(styles.status, styles.statusSuccess) : classNames(styles.status, styles.statusFailed)
          }
        >
          {topRight}
        </div>
      </div>
      <div className={styles.rowMiddle}>
        <div>{topLeftSub}</div>
        <div>{topRightSub}</div>
      </div>
      <div className={styles.rowFooter}>
        <div className={styles.item}>{bottomLeft}</div>
        <div className={styles.item}>{bottomMiddle}</div>
        <div className={styles.item}>{bottomRight}</div>
      </div>
    </div>
  )
}
