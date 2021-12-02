/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, SessionStats } from 'mysterium-vpn-js'
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons'

import { seconds2Time } from '../../../../commons/date.utils'
import formatBytes, { add } from '../../../../commons/formatBytes'
import { displayMyst } from '../../../../commons/money.utils'
import EarningsStatCard from './EarningsStatCard'

import Statistic from './StatCard'

interface Props {
  stats: SessionStats
  identity: Identity
  testnet?: boolean
}

const Statistics = ({ stats, identity, testnet }: Props) => {
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
        helpText="These are confirmed earnings which are not settled to Balance yet. Settlement to Balance is done automatically when 0.3 MYST is reached."
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
