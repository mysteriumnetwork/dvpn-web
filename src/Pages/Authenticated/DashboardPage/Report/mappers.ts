/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pair } from '../Charts/types'
import { GroupByDate } from './types'
import bytes from '../../../../commons/bytes'

const earningPairs = (group: GroupByDate): Pair[] => {
  return Object.keys(group).map((date) => ({
    x: date,
    y: group[date].reduce((acc, s) => (acc += Number(s.earnings.human)), 0),
  }))
}

const dataPairs = (group: GroupByDate): Pair[] => {
  return Object.keys(group)
    .map((date) => ({
      x: date,
      y: group[date].reduce((acc, s) => (acc += Number(s.transferredBytes)), 0),
    }))
    .map((p) => ({ ...p, y: bytes.bytes2Gb(p.y) }))
}

const sessionCountPairs = (group: GroupByDate): Pair[] => {
  return Object.keys(group).map((date) => ({
    x: date,
    y: group[date].length,
  }))
}

export const MAPPERS: { [key: string]: (group: GroupByDate) => Pair[] } = {
  earnings: earningPairs,
  data: dataPairs,
  sessions: sessionCountPairs,
}
