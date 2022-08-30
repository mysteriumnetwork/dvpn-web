/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionV2 } from 'mysterium-vpn-js/lib/provider'
import { Pair } from './types'
import { ChartType, GroupedByTime } from './types'
import { PAIR_MAPPERS } from './PAIR_MAPPERS'
import { currentCurrency } from '../../../../commons/currency'
import { MetricsRange } from '../../../../types/common'
import { hour, localDate } from './dates'

const units = (type: ChartType): string | undefined =>
  ({
    earnings: ` ${currentCurrency()}`,
    data: ' GB',
    sessions: '',
  }[type])

const pairs = (sessions: SessionV2[], type: ChartType, range: MetricsRange): Pair[] =>
  PAIR_MAPPERS[type](range === '1d' ? groupByLast24Hours(sessions) : groupByDays(sessions, range))

const emptyGroup = (key: string) => ({ [key]: [] })

const groupByLast24Hours = (sessions: SessionV2[]): GroupedByTime[] => {
  const grouped: GroupedByTime[] = []

  const now = new Date()
  for (let i = 0; i < 24; i++) {
    grouped.push(emptyGroup(hour(now.toISOString())))
    now.setHours(now.getHours() - 1)
  }
  grouped.reverse()

  sessions.forEach((s) => {
    const key = hour(s.startedAt)
    const group = grouped.find((g) => g[key])

    if (group) {
      group[key].push(s)
    }
  })
  return grouped
}

const groupByDays = (sessions: SessionV2[], range: MetricsRange): GroupedByTime[] => {
  const grouped: GroupedByTime[] = []
  const now = new Date()
  for (let i = 0; i < days(range); i++) {
    grouped.push(emptyGroup(localDate(now.toISOString())))
    now.setDate(now.getDate() - 1)
  }
  grouped.reverse()

  sessions.forEach((s) => {
    const key = localDate(s.startedAt)
    const group = grouped.find((g) => g[key])

    if (group) {
      group[key].push(s)
    }
  })
  return grouped
}

const days = (period: string): number => {
  try {
    return Number(period.split('d')[0]) + 1
  } catch (ignored: any) {
    return 31
  }
}

const series = { pairs, units }

export default series
