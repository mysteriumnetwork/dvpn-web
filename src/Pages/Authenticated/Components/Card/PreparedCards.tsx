/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useSelector } from 'react-redux'
import { selectors } from '../../../../redux/selectors'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { zeroStakeSettlementThreshold } from '../../../../commons/config'
import { StatCard } from './StatCard'
import { myst } from '../../../../commons/myst.utils'
import { HeroStatCard } from './HeroStatCard'
import { ReactComponent as WalletIcon } from '../../../../assets/icons/WithdrawalWallet.svg'
import WithdrawalModal from '../WithdrawalModal/WithdrawalModal'
import { useMemo, useState } from 'react'
import { seconds2Time } from '../../../../commons/date.utils'
import { SessionStats } from 'mysterium-vpn-js'
import formatBytes, { add } from '../../../../commons/formatBytes'
import { tequila } from '../../../../api/ApiWrapper'
import { toastError, toastSuccess } from '../../../../commons/toast.utils'
import { parseError } from '../../../../commons/error.utils'
import ConfirmationDialogue from '../../../../Components/ConfirmationDialogue/ConfirmationDialogue'

const UnsettledEarnings = () => {
  const identity = useSelector(selectors.currentIdentitySelector)
  const config = useSelector(selectors.configSelector)
  const fees = useSelector(selectors.feesSelector)

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const tooltipText = useMemo(
    () =>
      `These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done either automatically when ${zeroStakeSettlementThreshold(
        config,
      )} MYST is reached or manually when SETTLE button is clicked. Please note that settlement fee is 20% plus blockchain fees (${myst.displayMYST(
        fees.settlement,
      )}), so Balance will be lower than Total earnings.`,
    [fees.settlement, config],
  )

  const confirmationText = useMemo(
    () =>
      `Please click OK to proceed with settlement to Balance. Note: 20% network fee plus blockchain transaction fees (${myst.displayMYST(
        fees.settlement,
      )}) will be applied.`,
    [fees.settlement],
  )

  return (
    <>
      <StatCard
        stat={myst.displayMYST(identity.earnings, {
          ...DEFAULT_MONEY_DISPLAY_OPTIONS,
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
        message={confirmationText}
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
      stat={myst.displayMYST(amount, {
        ...DEFAULT_MONEY_DISPLAY_OPTIONS,
        fractionDigits: 2,
      })}
      name="Total Withdrawn"
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
  const identity = useSelector(selectors.currentIdentitySelector)
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
