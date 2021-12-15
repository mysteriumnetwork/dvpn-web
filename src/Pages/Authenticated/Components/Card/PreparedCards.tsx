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

export const UnsettledEarning = () => {
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

export const TotalWithdrawn = ({ amount }: { amount?: string }) => {
  return <StatCard stat={myst.displayMYST(amount)} name="Total Withdrawn" />
}
