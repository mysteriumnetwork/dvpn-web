/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SeriesResponse } from 'mysterium-vpn-js'
import { ChartType, Pair } from './types'
import { currentCurrency } from '../../../../commons/currency'
import { MetricsRange } from '../../../../types/common'
import { hour, localDate } from './dates'
import { tequila } from '../../../../api/tequila'
import bytes from '../../../../commons/bytes'

const units = (type: ChartType): string | undefined =>
  ({
    earnings: ` ${currentCurrency()}`,
    data: ' GiB',
    sessions: '',
  }[type])

const days = (period: string): number => {
  try {
    return Number(period.split('d')[0]) + 1
  } catch (ignored: any) {
    return 31
  }
}

const template = (range: MetricsRange): Pair[] => {
  const prefilled: Pair[] = []

  if (range === '1d') {
    const now = new Date()
    for (let i = 0; i < 24; i++) {
      prefilled.push({ y: 0, x: hour(now.getTime() / 1000) })
      now.setHours(now.getHours() - 1)
    }
  } else {
    const now = new Date()
    for (let i = 0; i < days(range); i++) {
      prefilled.push({ y: 0, x: localDate(now.getTime() / 1000) })
      now.setDate(now.getDate() - 1)
    }
  }

  prefilled.reverse()
  return prefilled
}

const transformValue = (value: string, type: ChartType): number => {
  if (type === 'data') {
    return bytes.gib(Number(value))
  }

  return Number(value)
}

export const seriesToPairs = ({ data }: SeriesResponse, range: MetricsRange, type: ChartType): Pair[] => {
  const result: Pair[] = template(range)

  for (let i = 0; i < data.length; i++) {
    const entry = data[i]
    const x = range === '1d' ? hour(entry.timestamp) : localDate(entry.timestamp)

    const index = result.findIndex((p) => p.x === x)
    if (index !== -1) {
      const r = result[index]
      result[index] = { ...r, y: r.y + transformValue(entry.value, type) }
    }
  }

  return result
}

type SeriesFuncName = 'seriesEarnings' | 'seriesData' | 'seriesSessions'

const TYPE_2_FUNC_NAME: { [key: string]: SeriesFuncName } = {
  earnings: 'seriesEarnings',
  data: 'seriesData',
  sessions: 'seriesSessions',
}

const pairs = async (range: MetricsRange, type: ChartType): Promise<Pair[]> => {
  const response = await tequila.api.provider[TYPE_2_FUNC_NAME[type]]({ range })
  return seriesToPairs(response, range, type)
}

const series = { units, pairs }

export default series
