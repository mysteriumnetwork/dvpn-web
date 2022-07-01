/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from './Card'
import styles from './Card.module.scss'
import Tooltip from '../../../../Components/Tooltip/Tooltip'
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
    <Card>
      <p className={styles.value}>{stat}</p>
      <p className={styles.label}>
        {name}
        {helpText && <Tooltip title={helpText} />}
      </p>
      {hasAction && (
        <Button onClick={onAction} extraStyle="gray">
          {action}
        </Button>
      )}
    </Card>
  )
}
