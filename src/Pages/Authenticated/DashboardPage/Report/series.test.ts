/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import series, { seriesToPairs } from './series'
import { ChartType, Pair } from './types'
import { currentCurrency } from '../../../../commons/currency'
import { SeriesEntry } from 'mysterium-vpn-js'

test.each<{ chart: ChartType; unit: any }>([
  { chart: 'data', unit: ' GB' },
  { chart: 'earnings', unit: ` ${currentCurrency()}` },
  { chart: 'sessions', unit: '' },
])('chart type to units %j', ({ chart, unit }) => {
  expect(series.units(chart)).toEqual(unit)
})

// 1663246040 === Thu Sep 15 2022 15:47:20 GMT+0300 (Eastern European Summer Time) {}
test.each<{ entry: SeriesEntry; type: ChartType; expected: Pair }>([
  { entry: { value: '110000000', timestamp: 1663246040 }, type: 'data', expected: { x: '09-15', y: 0.11 } },
  { entry: { value: '1000', timestamp: 1663246040 }, type: 'earnings', expected: { x: '09-15', y: 1000 } },
  { entry: { value: '2', timestamp: 1663246040 }, type: 'sessions', expected: { x: '09-15', y: 2 } },
])('pair conversion %j', ({ entry, type, expected }) => {
  // given
  const pairs = curried([entry], type)
  const found = pairs.find((m) => m.y !== 0)

  // expect
  expect(found).toBeDefined()
  expect(found?.y).toEqual(expected.y)
  expect(found?.x).toEqual(expected.x)
})

const curried = (data: SeriesEntry[], type: ChartType) => seriesToPairs({ data }, '7d', type)
