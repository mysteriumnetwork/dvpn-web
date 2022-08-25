/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pair } from './types'

const maxValueClosestInteger = (pairs: Pair[]): number =>
  pairs.length === 0 ? 0 : Math.ceil(Math.max(...pairs.map((p) => p.y)))

const ticks = (pairs: Pair[]): number[] => {
  const maxTick = maxValueClosestInteger(pairs) || 1

  const midTick = Number((maxTick / 2).toFixed(2))
  return [0, midTick / 2, midTick, maxTick - midTick / 2, maxTick]
}

const charts = {
  ticks,
}

export default charts
