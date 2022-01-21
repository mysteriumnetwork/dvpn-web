/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const defaultTx: TWithdrawal = Object.freeze({
  tx_hash: '0x0423b4876780466a4d2e3825037a83a8ceafe549077d6fb161f3a57c10bb15bf',
  provider_id: '0x346f36a85918b08c8359639457fd7e53279e0e6f',
  hermes_id: '0xa62a2A75949d25e17C6F08a7818e7bE97c18a8d2',
  channel_address: '0xB0d9C416e4426f655E37C3410515f51292F2acED',
  beneficiary: '0x7254A32958c19ea064DbB32540E047818661cFCB',
  amount: 3194958964504000000,
  settled_at: '2022-01-19T17:13:15Z',
  fees: 676645886140960000,
  is_withdrawal: true,
  block_explorer_url: 'https://polygonscan.com/tx/0x0423b4876780466a4d2e3825037a83a8ceafe549077d6fb161f3a57c10bb15bf',
  error: '',
})

const pagedResponse = <T>(items: T[] | T): TPageable<T> => {
  if (items instanceof Array) {
    return {
      items: items,
      page: 1,
      page_size: items.length,
      total_items: items.length,
      total_pages: 1,
      withdrawal_total: '0',
    }
  }

  return {
    items: [items],
    page: 1,
    page_size: 1,
    total_items: 1,
    total_pages: 1,
    withdrawal_total: '0',
  }
}

export const tequilaFixtures = {
  defaultTx,
  pagedResponse,
}

export type TPageable<T> = {
  items: T[]
  page: number
  page_size: number
  total_items: number
  total_pages: number
  withdrawal_total?: string
}

export type TWithdrawal = {
  tx_hash: string
  provider_id: string
  hermes_id: string
  channel_address: string
  beneficiary: string
  amount: number
  settled_at: string
  fees: number
  is_withdrawal: boolean
  block_explorer_url: string
  error: string
}

test('ignore', () => {
  expect(1).toEqual(1)
})
