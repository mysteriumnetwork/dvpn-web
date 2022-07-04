/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import { add } from '../../../../commons/bytes'
import { myst } from '../../../../commons/mysts'
import { currentCurrency } from '../../../../commons/currency'

export interface Pair {
  x: string
  y: number | string
}

interface StatsDaily {
  [name: string]: SessionStats
}

export const sessionDailyStatsToEarningGraph = (statsDaily: StatsDaily): Pair[] => {
  return Object.keys(statsDaily).map<Pair>((k) => ({
    x: formatDate(k),
    y: myst.display(statsDaily[k].sumTokens, { fractionDigits: 3, showCurrency: false }),
  }))
}

export const sessionDailyStatsToSessionsGraph = (statsDaily: StatsDaily): Pair[] => {
  return Object.keys(statsDaily).map<Pair>((k) => ({
    x: formatDate(k),
    y: statsDaily[k].count,
  }))
}

export const sessionDailyStatsToData = (statsDaily: StatsDaily): Pair[] => {
  return Object.keys(statsDaily).map<Pair>((k) => ({
    x: formatDate(k),
    y: (add(statsDaily[k].sumBytesReceived, statsDaily[k].sumBytesSent) / 1_000_000_000).toFixed(2),
  }))
}

const formatDate = (malformed: string): string => {
  return malformed
  // const month = malformed.substring(4, 2)
  // const day = malformed.substring(6, 2)
  // return `${month}-${day}`
}

export const types: {
  [key: string]: {
    name: string
  }
} = {
  earnings: {
    name: 'Earnings',
  },
  sessions: {
    name: 'Sessions',
  },
  data: {
    name: 'Data',
  },
}

interface Config {
  dataFunction: (arg: { [p: string]: SessionStats }) => Pair[]
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

const charts = {
  sessionDailyStatsToEarningGraph,
  sessionDailyStatsToSessionsGraph,
  sessionDailyStatsToData,
  configByType,
  types,
  ticks,
  ceilingOf2,
}
export default charts
