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

test('options', () => {
  expect(myst.display(myst.toWeiBig(1.5), { fractions: 2, currency: false })).toEqual('1.50')
  expect(myst.display(myst.toWeiBig(1.5), { fractions: 3, currency: false })).toEqual('1.500')
  expect(myst.display(myst.toWeiBig(1.5), { fractions: 2, currency: true })).toEqual('1.50 MYST')
  expect(myst.display(myst.toWeiBig(1.5), { fractions: 0, currency: true })).toEqual('1 MYST')
})

test.each([
  { wei: '6123456789123456789', expected: '6.1234567' },
  { wei: '23456789123456789', expected: '0.0234567' },
  { wei: '1', expected: '0.0000000' },
  { wei: '0', expected: '0.0000000' },
])('toEtherBig: %s', (data) => {
  expect(myst.toEtherBig(data.wei).toFixed(7)).toEqual(data.expected)
})
