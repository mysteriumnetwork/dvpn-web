/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { SessionStats } from 'mysterium-vpn-js'

import { seconds2Time } from '../../../../commons/date.utils'
import formatBytes, { add } from '../../../../commons/formatBytes'
import { displayMyst } from '../../../../commons/money.utils'

import Statistic from './Statistic'

interface Props {
  stats: SessionStats
  unsettledEarnings: number
  testnet?: boolean
}

const Statistics = ({ stats, unsettledEarnings, testnet }: Props) => {
  return (
    <>
      {testnet ? (
        <Statistic stat={displayMyst(stats.sumTokens)} name="Total Earnings" />
      ) : (
        <Statistic stat={displayMyst(unsettledEarnings)} name="Unsettled earnings" />
      )}
      <Statistic stat={seconds2Time(stats.sumDuration)} name="Sessions time" />
      <Statistic stat={formatBytes(add(stats.sumBytesSent, stats.sumBytesReceived))} name="Transferred" />
      <Statistic stat={'' + stats.count} name="Sessions" />
      <Statistic stat={'' + stats.countConsumers} name="Unique clients" />
    </>
  )
}

export default Statistics
