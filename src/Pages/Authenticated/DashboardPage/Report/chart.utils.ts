/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pair } from './types'

const ticks = (allPairs: Pair[]): number[] => {
  if (allPairs.length < 2) {
    return [0, 1, 2]
  }
  const maxTick = Math.ceil(Math.max(...allPairs.map((p) => p.y)))
  const midTick = Number((maxTick / 2).toFixed(2))
  return [0, midTick / 2, midTick, maxTick - midTick / 2, maxTick]
}

const charts = {
  ticks,
}

export default charts
