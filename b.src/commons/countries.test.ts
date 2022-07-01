/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import countries from './countries'

test('country codes', () => {
  expect(countries.countryName('lT')).toEqual('Lithuania')
  expect(countries.countryName('-')).toEqual('Unknown')
  expect(countries.countryName('ZZ')).toEqual('Unknown')
  expect(countries.countryName('asljfhsaoy8947953q09erowet428yhidsaohfideu')).toEqual('Unknown')
})

test.each(Object.keys(countries.countryNames))('country code %s', (code) => {
  expect(countries.countryName(code.toUpperCase())).toEqual(countries.countryNames[code])
})
