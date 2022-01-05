/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './StatCard.module.scss'
import HelpTooltip from '../../../../Components/HelpTooltip/HelpTooltip'
import React from 'react'
import Button from '../../../../Components/Buttons/Button'

interface Props {
  stat: string | number
  name: string
  helpText?: string
  action?: string
  onAction?: () => void
}

export const StatCard = ({ stat, name, helpText, action, onAction }: Props) => {
  const hasAction = action && onAction

  return (
    <div className={styles.card}>
      <p className={styles.cardValue}>{stat}</p>
      <p className={styles.cardLabel}>
        {name}
        {helpText && <HelpTooltip title={helpText} />}
      </p>
      {hasAction && (
        <Button onClick={onAction} extraStyle="gray">
          {action}
        </Button>
      )}
    </div>
  )
}
