/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SessionV2 } from 'mysterium-vpn-js'

export interface Pair {
  x: string
  y: number
}

export interface ChartData {
  series: Pair[]
  units?: string
  tooltipFormatter: (value: string) => string
}

export type ChartType = 'earnings' | 'sessions' | 'data' | string

export interface GroupedByTime {
  [date: string]: SessionV2[]
}
