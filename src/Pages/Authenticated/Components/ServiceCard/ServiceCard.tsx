/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './ServiceCards.module.scss'
import { ReactNode } from 'react'
import classNames from 'classnames'

import { ReactComponent as DataIcon } from '../../../../assets/images/authenticated/components/data.svg'
import { ReactComponent as ClockIcon } from '../../../../assets/images/authenticated/components/clock.svg'
import { ReactComponent as WalletIcon } from '../../../../assets/images/authenticated/components/wallet.svg'
import { ReactComponent as PeopleIcon } from '../../../../assets/images/authenticated/components/people.svg'
import { ReactComponent as InfoInverted } from '../../../../assets/images/authenticated/components/infoInverted.svg'
import { Switch } from '../../../../Components/Switch/Switch'
import { myst } from '../../../../commons/mysts'

interface Props {
  name: string
  description: string
  enabled: boolean
  onChange: () => void
  priceGiB?: string | number
  priceHour?: string | number
  earnings?: string | number
  totalEarning?: string | number
}

export const ServiceCard = ({
  name,
  description,
  enabled,
  onChange,
  priceGiB = 0,
  priceHour = 0,
  earnings = 0,
  totalEarning = 0,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <PendingApproval />
        <Row className={styles.controls}>
          <div>{name}</div>
          <div>
            <Switch checked={enabled} onChange={onChange} />
          </div>
        </Row>
        <Row className={styles.serviceInfo}>{description}</Row>
      </div>
      <div className={styles.content}>
        <Row>
          <Info title="Price per GiB" value={myst.display(priceGiB, { fractionDigits: 4 })} icon={<DataIcon />} />
          <Info title="Price per hour" value={myst.display(priceHour, { fractionDigits: 4 })} icon={<ClockIcon />} />
        </Row>
        <Row>
          <Info title="Service earnings" value={myst.display(earnings, { fractionDigits: 4 })} icon={<WalletIcon />} />
          <Info
            title="Total earnings"
            value={myst.display(totalEarning, { fractionDigits: 4 })}
            icon={<PeopleIcon />}
          />
        </Row>
      </div>
    </div>
  )
}

interface RowProps {
  className?: string
  children?: ReactNode
}

const Row = ({ className, children }: RowProps) => {
  return <div className={classNames(styles.row, className)}>{children}</div>
}

interface InfoProps {
  title: string
  value: string
  icon?: ReactNode
}

const Info = ({ title, value, icon }: InfoProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoIcon}>{icon && icon}</div>
      <div className={styles.infoTextRow}>
        <div className={styles.infoTitle}>{title}</div>
        <div className={styles.infoValue}>{value}</div>
      </div>
    </div>
  )
}

const PendingApproval = () => (
  <div className={styles.pendingApproval}>
    Pending Approval
    <InfoInverted />
  </div>
)
