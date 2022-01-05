/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChainSummary } from 'mysterium-vpn-js'
import { myst } from '../../../../commons/myst.utils'
import styles from './FeesTable.module.scss'
import classNames from 'classnames'
import { CalculatedFees } from '../../../../commons/fees'

interface Props {
  earnings: number
  chainSummary: ChainSummary
  calculatedFees: CalculatedFees
}

export const FeesTable = ({ earnings, chainSummary, calculatedFees }: Props) => {
  const hermesCutPercentDisplay = `${calculatedFees.hermesCutPercent * 100}%`
  const chainName = chainSummary.chains[chainSummary.currentChain]

  return (
    <div className={styles.content}>
      <Card title="Amount" value={earnings} />
      <Card title={`Network fee (${hermesCutPercentDisplay})`} value={calculatedFees.hermesCutMyst} />
      <Card title={`${chainName} fee`} value={calculatedFees.blockchainFee} />
      <div className="flex-grow" />
      <Card
        title="Transferred to Balance"
        value={calculatedFees.profitsMyst > 0 ? calculatedFees.profitsMyst : 0}
        highlighted
      />
    </div>
  )
}

interface CardProps {
  title: string
  value: number
  highlighted?: boolean
}

const Card = ({ title, value, highlighted }: CardProps) => {
  return (
    <div className={classNames(styles.card, highlighted && styles.cardHighlighted)}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardValue}>{myst.displayMYST(value)}</div>
    </div>
  )
}
