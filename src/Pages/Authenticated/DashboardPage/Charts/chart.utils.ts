/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import bytes from '../../../../commons/bytes'
import { myst } from '../../../../commons/mysts'
import { currentCurrency } from '../../../../commons/currency'
import { SessionStatsWithByteTotal, SessionStatsWithDate } from '../../../../types/api'

const { add, bytes2Gb, subtract } = bytes
export interface Pair {
  x: string
  y: number | string
}

export const sessionDailyStatsToEarningGraph = (statsDaily: SessionStatsWithDate[]): Pair[] => {
  return statsDaily.map((stats) => ({
    x: formatDate(stats.date),
    y: myst.display(stats.sumTokens, { fractionDigits: 3, showCurrency: false }),
  }))
  // return Object.keys(statsDaily).map<Pair>((k) => ({
  //   x: formatDate(k),
  //   y: myst.display(statsDaily[k].sumTokens, { fractionDigits: 3, showCurrency: false }),
  // }))
}

export const sessionDailyStatsToSessionsGraph = (statsDaily: SessionStatsWithDate[]): Pair[] => {
  return statsDaily.map((stats) => ({
    x: formatDate(stats.date),
    y: stats.count,
  }))
  // return Object.keys(statsDaily).map<Pair>((k) => ({
  //   x: formatDate(k),
  //   y: statsDaily[k].count,
  // }))
}

export const sessionDailyStatsToData = (statsDaily: SessionStatsWithDate[]): Pair[] => {
  return statsDaily.map((stats) => ({
    x: formatDate(stats.date),
    y: bytes2Gb(add(stats.sumBytesReceived, stats.sumBytesSent)),
  }))
  // return Object.keys(statsDaily).map<Pair>((k) => ({
  //   x: formatDate(k),
  //   y: (add(statsDaily[k].sumBytesReceived, statsDaily[k].sumBytesSent) / 1_000_000_000).toFixed(2),
  // }))
}

const formatDate = (malformed: string): string => {
  const month = malformed.substring(4, 6)
  const day = malformed.substring(6, 8)
  return `${month}-${day}`
}

export const types: {
  [key: string]: {
    name: string
  }
} = {
  earnings: {
    name: 'earnings',
  },
  sessions: {
    name: 'sessions',
  },
  data: {
    name: 'data',
  },
}

interface Config {
  dataFunction: (arg: SessionStatsWithDate[]) => Pair[]
  dataName: string
}

export type ChartType = 'earnings' | 'sessions' | 'data'

const configByType = (type: ChartType): Config => {
  switch (type) {
    case 'earnings':
      return {
        dataFunction: sessionDailyStatsToEarningGraph,
        dataName: ` ${currentCurrency()}`,
      }
    case 'sessions':
      return {
        dataFunction: sessionDailyStatsToSessionsGraph,
        dataName: ' sessions',
      }
    case 'data':
      return {
        dataFunction: sessionDailyStatsToData,
        dataName: ' GB',
      }
  }
}

// calculates ticks by the taking the largest number from pairs, rounding it to the nearest
// multiple of 2 (i.e.: 1 -> 2, 5 -> 6, 2.1 -> 4) and converting into 3 ticks: [0, n/2, n] where n is nearest ceiling of 2
const ticks = (allPairs: Pair[]): number[] => {
  const defaultTicks = [0, 1, 2]

  if (allPairs.length === 0) {
    return defaultTicks
  }

  const lastPair = allPairs[allPairs.length - 1]
  const maxValue = lastPair.y as number
  if (maxValue < defaultTicks[2]) {
    return defaultTicks
  }

  const maxTick = ceilingOf2(maxValue)
  const midTick = maxTick / 2
  return [0, midTick, maxTick]
}

const ceilingOf2 = (n: number): number => {
  return Math.ceil(n / 2) * 2
}

const calculateDisplayTotals = (stats: SessionStatsWithDate[]): SessionStatsWithByteTotal => {
  const acc = stats.reduce(
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
  console.log('acc', acc)
  return acc
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
  sessionDailyStatsToEarningGraph,
  sessionDailyStatsToSessionsGraph,
  sessionDailyStatsToData,
  configByType,
  types,
  ticks,
  ceilingOf2,
  calculateDisplayTotals,
  calculateDiffs,
}

export default charts
