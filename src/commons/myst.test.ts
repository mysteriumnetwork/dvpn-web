/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { myst } from './myst.utils'
import { DECIMAL_PART } from 'mysterium-vpn-js'

test.each([
  { wei: 9007199254740991, expected: '9007199254740990' },
  { wei: 90071992547409912, expected: '90071992547409900' },
  { wei: 98.16874512345678 * DECIMAL_PART, expected: '98168745123456700000' },
  { wei: 1.6478 * DECIMAL_PART, expected: '1647800000000000000' },
])('safe round off: %s', (data) => {
  expect(myst.weiSafeString(data.wei)).toEqual(data.expected)
})
