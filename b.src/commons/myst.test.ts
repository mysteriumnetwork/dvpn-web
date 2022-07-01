/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { myst } from './mysts'

test.each([
  { wei: '6123456789123456789', expected: '6.1234567 MYST' },
  { wei: '23456789123456789', expected: '0.0234567 MYST' },
  { wei: '1', expected: '< 0.0000001 MYST' },
  { wei: '0', expected: '0.0000000 MYST' },
])('myst display: %s', (data) => {
  expect(myst.display(data.wei)).toEqual(data.expected)
})

test.each([
  { wei: '6123456789123456789', expected: '6.123456789123456789' },
  { wei: '23456789123456789', expected: '0.023456789123456789' },
  { wei: '1', expected: '0.000000000000000001' },
  { wei: '0', expected: '0' },
])('toEtherString: %s', (data) => {
  expect(myst.toEtherString(data.wei)).toEqual(data.expected)
})

test.each([
  { wei: '6123456789123456789', expected: '6.1234567' },
  { wei: '23456789123456789', expected: '0.0234567' },
  { wei: '1', expected: '0.0000000' },
  { wei: '0', expected: '0.0000000' },
])('toEtherBig: %s', (data) => {
  expect(myst.toEtherBig(data.wei).toFixed(7)).toEqual(data.expected)
})

test.each([
  { wei: '6.123456789123456789', expected: '6123456789123456789' },
  { wei: '0.023456789123456789', expected: '23456789123456789' },
  { wei: '0.000000000000000001', expected: '1' },
  { wei: '0', expected: '0' },
])('toWeiString: %s', (data) => {
  expect(myst.toWeiString(data.wei)).toEqual(data.expected)
})
