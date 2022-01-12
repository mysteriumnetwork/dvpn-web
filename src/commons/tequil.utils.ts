/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'

const addStats = (a: SessionStats, b: SessionStats): SessionStats => {
  return {
    ...a,
    count: b.count,
    countConsumers: b.countConsumers,
    sumBytesReceived: b.sumBytesReceived,
    sumBytesSent: b.sumBytesSent,
    sumDuration: b.sumDuration,
    sumTokens: b.sumTokens,
  }
}

export const tequilUtils = {
  addStats,
}
