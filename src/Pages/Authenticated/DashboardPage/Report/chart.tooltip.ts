/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChartType } from './types'
import { myst } from '../../../../commons/mysts'
import series from './series'

const earnings = (value: string) => myst.display(myst.toWeiBig(value), { fractions: 3 })
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
