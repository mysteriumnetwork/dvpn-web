/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pair } from './types'
import { ChartType, GroupedByTime } from './types'
import bytes from '../../../../commons/bytes'
import { myst } from '../../../../commons/mysts'
import series from './series'

const onlyKey = (g: GroupedByTime) => Object.keys(g)[0]
const onlyValue = (g: GroupedByTime) => g[Object.keys(g)[0]]

const earningPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped.map((group) => ({
    x: onlyKey(group),
    y: onlyValue(group).reduce((acc, s) => acc + Number(s.earnings.human), 0),
  }))
}

const dataPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped
    .map((group) => ({
      x: onlyKey(group),
      y: onlyValue(group).reduce((acc, s) => acc + Number(s.transferredBytes), 0),
    }))
    .map((p) => ({ ...p, y: bytes.bytes2Gb(p.y) }))
}

const sessionCountPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped.map((group) => ({
    x: onlyKey(group),
    y: onlyValue(group).length,
  }))
}

export const PAIR_MAPPERS: { [key: string]: (grouped: GroupedByTime[]) => Pair[] } = {
  earnings: earningPairs,
  data: dataPairs,
  sessions: sessionCountPairs,
}

const earnings = (value: string) => myst.display(myst.toWeiString(value), { fractionDigits: 3 })
const data = (value: string) => `${value} ${series.units('data')}`

const TOOLTIP_FORMATTERS: { [key: ChartType]: (value: string) => string } = {
  earnings,
  data,
}

const defaultMapper = (value: string) => value

export const tooltipFormatter = (type: ChartType) => {
  const mapper = TOOLTIP_FORMATTERS[type]
  return mapper ?? defaultMapper
}
