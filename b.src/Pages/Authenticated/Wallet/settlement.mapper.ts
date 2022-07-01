/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Settlement, SettlementListResponse } from 'mysterium-vpn-js'

const newLine = '\n'

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

export const toCsv = (response: SettlementListResponse): string => {
  const { items } = response
  if (items.length === 0) {
    return 'No settlement history'
  }

  const columns = Object.keys(items[0]) as [keyof Settlement]

  let csv = `"${columns.map(alias).join(',')}"${newLine}`
  items.forEach((item) => {
    const values = columns.map((column) => `"${item[column]}"`).join(',')
    csv += `${values}${newLine}`
  })

  return csv
}
