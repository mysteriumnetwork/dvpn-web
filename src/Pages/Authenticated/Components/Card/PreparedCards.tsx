/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { tequila } from '../../../../api/wrapped-calls'
import { ReactComponent as WalletIcon } from '../../../../assets/icons/WithdrawalWallet.svg'
import { configParser } from '../../../../commons/config'
import { seconds2Time } from '../../../../commons/date.utils'
import { parseError } from '../../../../commons/error.utils'
import { feeCalculator } from '../../../../commons/fees'
import formatBytes, { add } from '../../../../commons/formatBytes'
import { myst } from '../../../../commons/myst.utils'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import ConfirmationDialogue from '../../../../Components/ConfirmationDialogue/ConfirmationDialogue'
import { selectors } from '../../../../redux/selectors'
import { FeesTable } from '../Fees/FeesTable'
import WithdrawalModal from '../WithdrawalModal/WithdrawalModal'
import { HeroStatCard } from './HeroStatCard'
import { StatCard } from './StatCard'

const UnsettledEarnings = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)
  const fees = useSelector(selectors.feesSelector)
  const chainSummary = useSelector(selectors.chainSummarySelector)

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done either automatically when ${configParser.zeroStakeSettlementThreshold(
        config,
      )} MYST is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus blockchain fees (${myst.display(
        fees.settlement,
      )}), so Balance will be lower than Total earnings.`,
    [fees.settlement, config],
  )

  const calculatedFees = useMemo(
    () => feeCalculator.calculateEarnings(identity.earnings, fees),
    [fees.hermes, fees.settlement, identity.earnings],
  )

  const isConfirmDisables = calculatedFees.profitsMyst <= 0

  return (
    <>
      <StatCard
        stat={myst.display(identity.earnings, {
          fractionDigits: 2,
        })}
        name="Unsettled earnings"
        helpText={tooltipText}
        action="Settle"
        onAction={() => setShowConfirmation(true)}
      />
      <ConfirmationDialogue
        open={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        message="Please click SETTLE to proceed with settlement to Balance. Note: Settlement transaction may take a few minutes to complete."
        content={<FeesTable earnings={identity.earnings} chainSummary={chainSummary} calculatedFees={calculatedFees} />}
        isConfirmDisabled={isConfirmDisables}
        confirmText="SETTLE"
        onConfirm={async () => {
          try {
            await tequila.api.settleAsync({ providerId: identity.id, hermesId: identity.hermesId })
            toastSuccess('Settlement was executed successfully!')
            setShowConfirmation(false)
          } catch (err) {
            toastError('Unfortunately, settlement failed. Please try again.')
            console.error(parseError(err))
          }
        }}
      />
    </>
  )
}

const TotalWithdrawn = ({ amount }: { amount?: string }) => {
  return (
    <StatCard
      stat={myst.display(amount, {
        fractionDigits: 2,
      })}
      name="Total Withdrawn"
      helpText="Total amount transferred to external wallet after all applicable fees."
    />
  )
}

const Balance = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <HeroStatCard
        buttonName="withdraw"
        value={myst.display(identity.balance)}
        icon={<WalletIcon />}
        label="Balance"
        onClick={() => setIsOpen(true)}
      />
      <WithdrawalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

const TotalEarnings = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  return (
    <StatCard
      stat={myst.display(identity.earningsTotal, {
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

const Sessions = ({ stats }: { stats: SessionStats }) => <StatCard stat={stats.count} name="Sessions" />

const UniqueClients = ({ stats }: { stats: SessionStats }) => (
  <StatCard stat={stats.countConsumers} name="Unique clients" />
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
