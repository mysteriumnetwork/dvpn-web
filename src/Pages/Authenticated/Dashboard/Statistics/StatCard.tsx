/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './StatCard.module.scss'
import HelpTooltip from '../../../../Components/HelpTooltip/HelpTooltip'
import React from 'react'

interface Props {
  stat: string
  name: string
  helpText?: string
}

const StatCard = ({ stat, name, helpText }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardValue}>{stat}</p>
      <p className={styles.cardLabel}>
        {name}
        {helpText && <HelpTooltip title={helpText} />}
      </p>
    </div>
  )
}

export default StatCard
