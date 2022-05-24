/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees } from 'mysterium-vpn-js'
import styles from './WithdrawalModal.module.scss'
import { myst } from '../../../../commons/mysts'
import React from 'react'
import classNames from 'classnames'

interface Props {
  withdrawalAmountWei: string
  fees: Fees
}

export const FeesRibbon = ({ withdrawalAmountWei, fees }: Props) => {
  return (
    <div className={styles.fees}>
      <Card info="Amount" value={myst.display(withdrawalAmountWei, { showCurrency: false })} />
      <Card info="Fee" value={myst.display(fees.settlement, { showCurrency: false })} />
      <Card
        info="You will get"
        value={myst.display(myst.toBig(withdrawalAmountWei).minus(fees.settlement), { showCurrency: false })}
        important
      />
    </div>
  )
}

const Card = ({ info, value, important }: { info: string; value: string | number; important?: boolean }) => {
  return (
    <div className={classNames(styles.card, important && styles.cardHighlighted)}>
      <div className={styles.info}>{info}</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
