/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixtures } from './fixtures.test'
import identities from './identities'

test('collect all hermes ids', () => {
  expect(identities.hermesIds(fixtures.defaultIdentity)).toEqual(['0x1', '0x2'])
})
