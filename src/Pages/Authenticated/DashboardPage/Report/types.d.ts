/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
