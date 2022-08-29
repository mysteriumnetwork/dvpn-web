/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionV2 } from 'mysterium-vpn-js'

const earnings = (sessions: SessionV2[]): number => sessions.reduce((acc, s) => acc + Number(s.earnings.human), 0)

const dataTransferredBytes = (sessions: SessionV2[]): number =>
  sessions.reduce((acc, s) => acc + Number(s.transferredBytes), 0)

const durationSeconds = (sessions: SessionV2[]): number => sessions.reduce((acc, s) => acc + s.durationSeconds, 0)

const totals = {
  earnings,
  dataTransferredBytes,
  durationSeconds,
}

export default totals
