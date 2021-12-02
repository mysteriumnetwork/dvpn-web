/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './SessionCard.module.scss'
import classNames from 'classnames'

interface Props {
  country: string
  onGoing: boolean
  id: string
  time: string
  data: string
  value: string
  createdAt?: string
}

const SessionCard = ({ country, onGoing, id, time, data, value, createdAt }: Props): JSX.Element => {
  return (
    <div className={styles.session}>
      <div className={styles.sessionHeader}>
        <div className={styles.sessionHeaderTitle}>{country}</div>
        <div
          className={
            onGoing ? classNames(styles.status, styles.statusSuccess) : classNames(styles.status, styles.statusFailed)
          }
        >
          {onGoing ? 'Ongoing' : ''}
        </div>
      </div>
      <div className={styles.sessionMeta}>
        <div>{id}</div>
        <div>({createdAt})</div>
      </div>
      <div className={styles.sessionStatistics}>
        <div className={styles.statistic}>{time}</div>
        <div className={styles.statistic}>{data}</div>
        <div className={styles.statistic}>{value}</div>
      </div>
    </div>
  )
}

export default SessionCard
