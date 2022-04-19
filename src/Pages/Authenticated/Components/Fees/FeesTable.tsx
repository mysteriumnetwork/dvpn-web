/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames'
import { ChainSummary, Tokens } from 'mysterium-vpn-js'
import { CalculatedFees } from '../../../../commons/fees'
import { myst } from '../../../../commons/myst.utils'
import styles from './FeesTable.module.scss'

interface Props {
  earnings: Tokens
  chainSummary: ChainSummary
  calculatedFees: CalculatedFees
}

export const FeesTable = ({ earnings, chainSummary, calculatedFees }: Props) => {
  const { display } = myst
  const hermesCutPercentDisplay = `${calculatedFees.hermesCutPercent * 100}%`
  const chainName = chainSummary.chains[chainSummary.currentChain]

  return (
    <div className={styles.content}>
      <Card title="Amount" value={display(earnings.wei)} />
      <Card title={`Network fee (${hermesCutPercentDisplay})`} value={display(calculatedFees.hermesCutWei)} />
      <Card title={`${chainName} fee`} value={display(calculatedFees.blockchainFeeWei)} />
      <div className="flex-grow" />
      <Card title="You get" value={display(calculatedFees.profitsWei)} highlighted />
    </div>
  )
}

interface CardProps {
  title: string
  value: string | number
  highlighted?: boolean
}

const Card = ({ title, value, highlighted }: CardProps) => {
  return (
    <div className={classNames(styles.card, highlighted && styles.cardHighlighted)}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  )
}
