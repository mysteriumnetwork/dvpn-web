/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useSelector } from 'react-redux'
import { configSelector, currentIdentitySelector } from '../../../../redux/selectors'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { zeroStakeSettlementThreshold } from '../../../../commons/config'
import { StatCard } from './StatCard'
import { myst } from '../../../../commons/myst.utils'
import { HeroStatCard } from './HeroStatCard'
import { ReactComponent as WalletIcon } from '../../../../assets/icons/WithdrawalWallet.svg'
import WithdrawalModal from '../WithdrawalModal/WithdrawalModal'
import { useState } from 'react'
import { seconds2Time } from '../../../../commons/date.utils'
import { SessionStats } from '../../../../../../mysterium-vpn-js'
import formatBytes, { add } from '../../../../commons/formatBytes'

const UnsettledEarnings = () => {
  const identity = useSelector(currentIdentitySelector)
  const config = useSelector(configSelector)
  return (
    <StatCard
      stat={myst.displayMYST(identity.earnings, {
        ...DEFAULT_MONEY_DISPLAY_OPTIONS,
        fractionDigits: 2,
      })}
      name="Unsettled earnings"
      helpText={`These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done automatically when ${zeroStakeSettlementThreshold(
        config,
      )} MYST is reached. Please note that settlement fee is 20% plus blockchain fees, so Balance will be lower than Total earnings.`}
    />
  )
}

const TotalWithdrawn = ({ amount }: { amount?: string }) => {
  return <StatCard stat={myst.displayMYST(amount)} name="Total Withdrawn" />
}

const Balance = () => {
  const identity = useSelector(currentIdentitySelector)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <HeroStatCard
        buttonName="withdraw"
        value={myst.displayMYST(identity.balance)}
        icon={<WalletIcon />}
        label="Balance"
        onClick={() => setIsOpen(true)}
      />
      <WithdrawalModal isOpen={isOpen} onClose={() => setIsOpen(false)} identity={identity} />
    </>
  )
}

const TotalEarnings = () => {
  const identity = useSelector(currentIdentitySelector)
  return (
    <StatCard
      stat={myst.displayMYST(identity.earningsTotal, {
        ...DEFAULT_MONEY_DISPLAY_OPTIONS,
        fractionDigits: 2,
      })}
      name="Total Earnings"
    />
  )
}

const SessionTime = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={seconds2Time(stats.sumDuration)} name="Sessions time" />
)

const Transferred = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={formatBytes(add(stats.sumBytesSent, stats.sumBytesReceived))} name="Transferred" />
)

const Sessions = ({ stats }: { stats: SessionStats }) => <StatCard stat={'' + stats.count} name="Sessions" />

const UniqueClients = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={'' + stats.countConsumers} name="Unique clients" />
)

export const Cards = {
  UnsettledEarnings,
  TotalWithdrawn,
  Balance,
  TotalEarnings,
  SessionTime,
  Transferred,
  Sessions,
  UniqueClients,
}
