/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChartType, Pair } from './types'
import { currentCurrency } from '../../../../commons/currency'
import { MetricsRange } from '../../../../types/common'
import { hour, localDate } from './dates'
import { tequila } from '../../../../api/tequila'
import bytes from '../../../../commons/bytes'
import { SessionV2 } from 'mysterium-vpn-js'

const units = (type: ChartType): string | undefined =>
  ({
    earnings: ` ${currentCurrency()}`,
    data: ' GiB',
    sessions: '',
  }[type])

const session2Date = (s: SessionV2) => localDate(new Date(s.startedAt).getTime())
const session2Hour = (s: SessionV2) => hour(new Date(s.startedAt).getTime())

const groupByDate = (sessions: SessionV2[]): Map<string, SessionV2[]> => {
  const dateToSessions = new Map<string, SessionV2[]>()

  for (const s of sessions) {
    const date = session2Date(s)
    const m = dateToSessions.get(date) ?? []
    m.push(s)
    dateToSessions.set(date, m)
  }

  return dateToSessions
}

const groupByHour = (sessions: SessionV2[]): Map<string, SessionV2[]> => {
  const dateToSessions = new Map<string, SessionV2[]>()

  const now = new Date()
  for (let i = 0; i < 24; i++) {
    dateToSessions.set(hour(now.getTime()), [])
    now.setHours(now.getHours() - 1)
  }

  for (const s of sessions) {
    dateToSessions.get(session2Hour(s))?.push(s)
  }

  return dateToSessions
}

const MAPPERS: Record<ChartType, (grouped: Map<string, SessionV2[]>) => Pair[]> = Object.freeze({
  earnings: (grouped: Map<string, SessionV2[]>) => {
    const pairs: Pair[] = []
    for (const [date, list] of grouped) {
      pairs.push({
        x: date,
        y: list.reduce((acc, s) => Number(s.earnings.human) || 0, 0),
      })
    }
    return pairs
  },
  sessions: (grouped: Map<string, SessionV2[]>) => {
    const pairs: Pair[] = []
    for (const [date, list] of grouped) {
      pairs.push({
        x: date,
        y: list.length,
      })
    }
    return pairs
  },
  data: (grouped: Map<string, SessionV2[]>) => {
    const pairs: Pair[] = []
    for (const [date, list] of grouped) {
      pairs.push({
        x: date,
        y: list.reduce((acc, s) => bytes.gib(Number(s.transferredBytes)) || 0, 0),
      })
    }
    return pairs
  },
})

const _convert = (range: MetricsRange, type: ChartType, sessions: SessionV2[]) => {
  const mapper = MAPPERS[type]
  return mapper ? mapper(range === '1d' ? groupByHour(sessions) : groupByDate(sessions)) : []
}

const pairs = async (range: MetricsRange, type: ChartType): Promise<Pair[]> => {
  const { sessions } = await tequila.api.provider.sessions({ range })
  const mapper = MAPPERS[type]
  return mapper ? mapper(range === '1d' ? groupByHour(sessions) : groupByDate(sessions)) : []
}

const series = { units, pairs, _convert }

export default series
