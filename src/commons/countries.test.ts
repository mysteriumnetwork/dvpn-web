/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import location from './location'

test('country codes', () => {
  expect(location.countryName('lT')).toEqual('Lithuania')
  expect(location.countryName('-')).toEqual('Unknown')
  expect(location.countryName('ZZ')).toEqual('Unknown')
  expect(location.countryName('asljfhsaoy8947953q09erowet428yhidsaohfideu')).toEqual('Unknown')
})

test.each(Object.keys(location.countryNames))('country code %s', (code) => {
  expect(location.countryName(code.toUpperCase())).toEqual(location.countryNames[code])
})
