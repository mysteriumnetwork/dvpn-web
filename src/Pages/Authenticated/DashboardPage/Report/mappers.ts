/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pair } from '../Charts/types'
import { GroupedByTime } from './types'
import bytes from '../../../../commons/bytes'

const earningPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped.map((group) => ({
    x: Object.keys(group)[0],
    y: group[Object.keys(group)[0]].reduce((acc, s) => (acc += Number(s.earnings.human)), 0),
  }))
}

const dataPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped
    .map((group) => ({
      x: Object.keys(group)[0],
      y: group[Object.keys(group)[0]].reduce((acc, s) => (acc += Number(s.transferredBytes)), 0),
    }))
    .map((p) => ({ ...p, y: bytes.bytes2Gb(p.y) }))
}

const sessionCountPairs = (grouped: GroupedByTime[]): Pair[] => {
  return grouped.map((group) => ({
    x: Object.keys(group)[0],
    y: group[Object.keys(group)[0]].length,
  }))
}

export const MAPPERS: { [key: string]: (grouped: GroupedByTime[]) => Pair[] } = {
  earnings: earningPairs,
  data: dataPairs,
  sessions: sessionCountPairs,
}
