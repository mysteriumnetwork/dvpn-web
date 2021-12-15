/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './HeroStatCard.module.scss'
import Button from '../../../../Components/Buttons/Button'

interface Props {
  value?: string
  label?: string
  icon?: React.ComponentProps<any>
  buttonName?: string
  onClick?: () => void
}

export const HeroStatCard = ({ value, label, icon, onClick, buttonName }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardStat}>
        <p className={styles.cardStatValue}>{value}</p>
        <p className={styles.cardStatLabel}>{label}</p>
      </div>
      <div>
        {buttonName && (
          <Button onClick={onClick} extraStyle="gray">
            {buttonName}
          </Button>
        )}
      </div>
    </div>
  )
}
