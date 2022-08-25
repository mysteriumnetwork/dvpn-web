/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import charts from './chart.utils'

test('chart ticks (only positives)', () => {
  expect(charts.ticks([])).toEqual([0, 0.25, 0.5, 0.75, 1])
  expect(charts.ticks([{ x: '', y: 10 }])).toEqual([0, 2.5, 5, 7.5, 10])
  expect(
    charts.ticks([
      { x: '', y: 2 },
      { x: '', y: 10 },
    ]),
  ).toEqual([0, 2.5, 5, 7.5, 10])
  expect(
    charts.ticks([
      { x: '', y: 10 },
      { x: '', y: 2 },
    ]),
  ).toEqual([0, 2.5, 5, 7.5, 10])
  expect(charts.ticks([{ x: '', y: 0.02 }])).toEqual([0, 0.25, 0.5, 0.75, 1])
})
