/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { stats } from './stats'

test('stats - add', () => {
  const result = stats.addStats(
    {
      count: 1,
      countConsumers: 2,
      sumBytesReceived: 3,
      sumBytesSent: 4,
      sumDuration: 5,
      sumTokens: 6,
    },
    {
      count: 6,
      countConsumers: 5,
      sumBytesReceived: 4,
      sumBytesSent: 3,
      sumDuration: 2,
      sumTokens: 1,
    },
  )

  expect(result).toEqual({
    count: 7,
    countConsumers: 7,
    sumBytesReceived: 7,
    sumBytesSent: 7,
    sumDuration: 7,
    sumTokens: 7,
  })
})
