/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionStats } from 'mysterium-vpn-js'

export type DateToSessionStats = { [date: string]: SessionStats }
export type SessionStatsWithDate = SessionStats & { date: string }
