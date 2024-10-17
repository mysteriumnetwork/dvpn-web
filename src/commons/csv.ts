/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionV2, Settlement } from 'mysterium-vpn-js'
import { myst } from './mysts'

const aliases: { [key: string]: string } = {
  beneficiary: 'externalWalletAddress',
}

const alias = (original: string): string => {
  const a = aliases[original]
  if (a) {
    return a
  }
  return original
}

export const settlementsToCsv = (settlements: Settlement[]): string => {
  if (settlements.length === 0) {
    return 'No settlement history'
  }

  const columns = Object.keys(settlements[0]) as [keyof Settlement]
  const headerRow = columns
    .map(alias)
    .map((c) => `"${c}"`)
    .join(',')

  const dataRows = settlements.map((settlement) => columns.map((column) => `"${settlement[column]}"`).join(','))

  return [headerRow, ...dataRows].join('\n')
}

export const sessionsToCsv = (sessions: SessionV2[]): string => {
  if (sessions.length === 0) {
    return 'No sessions'
  }

  const columns = Object.keys(sessions[0]) as [keyof SessionV2]
  const headerRow = columns.map((c) => `"${c}"`).join(',')

  const dataRows = sessions.map((session) =>
    columns
      .map((column) => {
        if (column === 'earnings') {
          return `"${myst.display(session[column].wei, { fractions: 18, currency: false })}"`
        }
        return `"${session[column]}"`
      })
      .join(','),
  )

  return [headerRow, ...dataRows].join('\n')
}
