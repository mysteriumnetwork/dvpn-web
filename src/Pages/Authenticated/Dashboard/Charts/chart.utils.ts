/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'
import { add } from '../../../../commons/bytes'
import { myst } from '../../../../commons/mysts'

export interface Pair {
  x: string
  y: number | string
}

interface StatsDaily {
  [name: string]: SessionStats
}

export const sessionDailyStatsToEarningGraph = (statsDaily: StatsDaily): Pair[] => {
  let accum = myst.toBig(0)
  return Object.keys(statsDaily).map<Pair>((dateKey) => ({
    x: formatDate(dateKey),
    y: myst.display((accum = accum.plus(statsDaily[dateKey].sumTokens)), { fractionDigits: 3, showCurrency: false }),
  }))
}

export const sessionDailyStatsToSessionsGraph = (statsDaily: StatsDaily): Pair[] => {
  let accum = 0
  return Object.keys(statsDaily).map<Pair>((dateKey) => ({
    x: formatDate(dateKey),
    y: accum += statsDaily[dateKey].count,
  }))
}

export const sessionDailyStatsToData = (statsDaily: StatsDaily): Pair[] => {
  let accum = 0
  return Object.keys(statsDaily).map<Pair>((dateKey) => ({
    x: formatDate(dateKey),
    y: (accum += add(statsDaily[dateKey].sumBytesReceived, statsDaily[dateKey].sumBytesSent) / 1_000_000_000).toFixed(
      2,
    ),
  }))
}

const formatDate = (malformed: string): string => {
  const month = malformed.substring(4, 6)
  const day = malformed.substring(6, 8)
  return `${month}-${day}`
}
