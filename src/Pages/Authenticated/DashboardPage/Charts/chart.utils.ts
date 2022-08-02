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
import { SessionStatsWithDate } from '../../../../types/api'

const { add, bytes2Gb } = bytes
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

const calculateDisplayTotals = (a: SessionStatsWithDate[]): SessionStats => {
  const acc = a.reduce(
    (acc, next) => {
      return {
        count: acc.count += next.count,
        countConsumers: acc.countConsumers += next.countConsumers,
        sumBytesReceived: acc.sumBytesReceived += next.sumBytesReceived,
        sumBytesSent: acc.sumBytesReceived += next.sumBytesSent,
        sumDuration: acc.sumDuration += next.sumDuration,
        sumTokens: acc.sumTokens += next.sumTokens,
      }
    },
    {
      count: 0,
      countConsumers: 0,
      sumBytesReceived: 0,
      sumBytesSent: 0,
      sumDuration: 0,
      sumTokens: 0,
    },
  )
  return acc
}

const calculateDiffs = (a: SessionStats, b: SessionStats): SessionStats => {
  const diffTotals: SessionStats = {
    count: a.count - b.count,
    countConsumers: a.countConsumers - b.countConsumers,
    sumBytesReceived: a.sumBytesReceived - b.sumBytesReceived,
    sumBytesSent: a.sumBytesSent - b.sumBytesSent,
    sumDuration: a.sumDuration - b.sumDuration,
    sumTokens: a.sumTokens - b.sumTokens,
  }
  return {
    count: b.count - diffTotals.count,
    countConsumers: b.countConsumers - diffTotals.countConsumers,
    sumBytesReceived: b.sumBytesReceived - diffTotals.sumBytesReceived,
    sumBytesSent: b.sumBytesSent - diffTotals.sumBytesSent,
    sumDuration: b.sumDuration - diffTotals.sumDuration,
    sumTokens: b.sumTokens - diffTotals.sumTokens,
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
