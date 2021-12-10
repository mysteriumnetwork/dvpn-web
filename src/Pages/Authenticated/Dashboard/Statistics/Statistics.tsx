/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, SessionStats } from 'mysterium-vpn-js'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'
import { zeroStakeSettlementThreshold } from '../../../../commons/config'

import { seconds2Time } from '../../../../commons/date.utils'
import formatBytes, { add } from '../../../../commons/formatBytes'
import { displayMyst } from '../../../../commons/money.utils'
import EarningsStatCard from './EarningsStatCard'

import Statistic from './StatCard'
import { useSelector } from 'react-redux'
import { configSelector } from '../../../../redux/selectors'

interface Props {
  stats: SessionStats
  identity: Identity
}

const Statistics = ({ stats, identity }: Props) => {
  const config = useSelector(configSelector)
  return (
    <>
      <Statistic
        stat={displayMyst(identity.earningsTotal, {
          ...DEFAULT_MONEY_DISPLAY_OPTIONS,
          fractionDigits: 2,
        })}
        name="Total Earnings"
      />
      <Statistic stat={seconds2Time(stats.sumDuration)} name="Sessions time" />
      <Statistic stat={formatBytes(add(stats.sumBytesSent, stats.sumBytesReceived))} name="Transferred" />
      <Statistic stat={'' + stats.count} name="Sessions" />
      <Statistic stat={'' + stats.countConsumers} name="Unique clients" />
      <Statistic
        stat={displayMyst(identity.earnings, {
          ...DEFAULT_MONEY_DISPLAY_OPTIONS,
          fractionDigits: 2,
        })}
        name="Unsettled earnings"
        helpText={`These are confirmed earnings which are not settled to your Balance yet. Settlement to Balance is done automatically when ${zeroStakeSettlementThreshold(
          config,
        )} MYST is reached. Please note that settlement fee is 20% plus blockchain fees, so Balance will be lower than Total earnings.`}
      />
      <EarningsStatCard
        stat={displayMyst(identity.balance, {
          ...DEFAULT_MONEY_DISPLAY_OPTIONS,
          fractionDigits: 2,
        })}
        name={`Balance`}
        identity={identity}
      />
    </>
  )
}

export default Statistics
