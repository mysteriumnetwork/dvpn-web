/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import bytes from '../../../../commons/bytes'
import { SessionStatsWithByteTotal, SessionStatsWithDate } from '../../../../types/api'
import { Pair } from './types'

const { subtract } = bytes

const ticks = (allPairs: Pair[]): number[] => {
  const maxTick = Math.ceil(Math.max(...allPairs.map((p) => p.y)))
  const midTick = Number((maxTick / 2).toFixed(2))
  return [0, midTick, maxTick]
}

const calculateDisplayTotals = (stats: SessionStatsWithDate[]): SessionStatsWithByteTotal => {
  return stats.reduce(
    (acc, next) => ({
      count: acc.count + next.count,
      countConsumers: acc.countConsumers + next.countConsumers,
      sumBytesReceived: acc.sumBytesReceived + next.sumBytesReceived,
      sumBytesSent: acc.sumBytesSent + next.sumBytesSent,
      sumDuration: acc.sumDuration + next.sumDuration,
      sumTokens: acc.sumTokens + next.sumTokens,
      byteTotal: acc.sumBytesReceived + acc.sumBytesSent + next.sumBytesReceived + next.sumBytesSent,
    }),
    {
      count: 0,
      countConsumers: 0,
      sumBytesReceived: 0,
      sumBytesSent: 0,
      sumDuration: 0,
      sumTokens: 0,
      byteTotal: 0,
    },
  )
}

const calculateDiffs = (
  totalPeriodStats: SessionStats,
  displayStats: SessionStatsWithByteTotal,
): SessionStatsWithByteTotal => {
  const diffTotals: SessionStatsWithByteTotal = {
    count: totalPeriodStats.count - displayStats.count,
    countConsumers: totalPeriodStats.countConsumers - displayStats.countConsumers,
    sumBytesReceived: subtract(totalPeriodStats.sumBytesReceived - displayStats.sumBytesReceived),
    sumBytesSent: subtract(totalPeriodStats.sumBytesSent - displayStats.sumBytesSent),
    sumDuration: totalPeriodStats.sumDuration - displayStats.sumDuration,
    sumTokens: totalPeriodStats.sumTokens - displayStats.sumTokens,
    byteTotal: totalPeriodStats.sumBytesReceived + totalPeriodStats.sumBytesSent - displayStats.byteTotal,
  }
  return {
    count: displayStats.count - diffTotals.count,
    countConsumers: displayStats.countConsumers - diffTotals.countConsumers,
    sumBytesReceived: subtract(displayStats.sumBytesReceived - diffTotals.sumBytesReceived),
    sumBytesSent: subtract(displayStats.sumBytesSent - diffTotals.sumBytesSent),
    sumDuration: displayStats.sumDuration - diffTotals.sumDuration,
    sumTokens: displayStats.sumTokens - diffTotals.sumTokens,
    byteTotal: subtract(displayStats.byteTotal - diffTotals.byteTotal),
  }
}

const charts = {
  ticks,
  calculateDisplayTotals,
  calculateDiffs,
}

export default charts
