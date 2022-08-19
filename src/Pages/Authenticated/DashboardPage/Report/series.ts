/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionV2 } from 'mysterium-vpn-js/lib/provider'
import { Pair } from '../Charts/types'
import { ChartType, GroupByDate } from './types'
import { MAPPERS } from './mappers'
import { currentCurrency } from '../../../../commons/currency'

const DAY_MS = 24 * 60 * 60 * 1000

const pairs = (sessions: SessionV2[], type: ChartType, range: string): Pair[] =>
  MAPPERS[type](groupByDate(sessions, range))

const units = (type: ChartType): string =>
  ({
    earnings: ` ${currentCurrency()}`,
    data: ' GB',
    sessions: '',
  }[type])

const rangeToNumber = (period: string): number => {
  try {
    return Number(period.split('d')[0])
  } catch (ignored: any) {
    return 30
  }
}

const groupByDate = (sessions: SessionV2[], range: string): GroupByDate => {
  const dayCount = rangeToNumber(range)
  const grouped = prefilledGroup(dayCount)

  sessions.forEach((s) => {
    const ld = localDate(s.startedAt)

    if (grouped[ld] === undefined) {
      grouped[ld] = [s]
    } else {
      grouped[ld].push(s)
    }
  })

  return grouped
}

const prefilledGroup = (dayCount: number): GroupByDate => {
  const grouped: GroupByDate = {}
  const now = Date.now()
  for (let i = 0; i < dayCount; i++) {
    const date = localDate(new Date(now + DAY_MS * i).toDateString())
    grouped[date] = []
  }
  return grouped
}

const localDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${month}-${day}`
}

const series = { pairs, units }

export default series
