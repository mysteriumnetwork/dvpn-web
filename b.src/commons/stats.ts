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
    count: a.count + b.count,
    countConsumers: a.countConsumers + b.countConsumers,
    sumBytesReceived: a.sumBytesReceived + b.sumBytesReceived,
    sumBytesSent: a.sumBytesSent + b.sumBytesSent,
    sumDuration: a.sumDuration + b.sumDuration,
    sumTokens: a.sumTokens + b.sumTokens,
  }
}

export const stats = {
  addStats,
}
