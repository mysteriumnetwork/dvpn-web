/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import series from './series'
import { ChartType, Pair } from './types'
import { currentCurrency } from '../../../../commons/currency'
import { localDate } from './dates'
import { SessionV2 } from 'mysterium-vpn-js'
import { TOKENS_EMPTY } from '../../../../constants/instances'

test.each<{ chart: ChartType; unit: any }>([
  { chart: 'data', unit: ' GiB' },
  { chart: 'earnings', unit: ` ${currentCurrency()}` },
  { chart: 'sessions', unit: '' },
])('chart type to units %j', ({ chart, unit }) => {
  expect(series.units(chart)).toEqual(unit)
})

const nowInSeconds = (): number => {
  return Number((Date.now() / 1000).toFixed(0))
}

const nowMinusTwoDays = () => {
  return nowInSeconds() - 2 * 24 * 60 * 60
}

const twoDaysBefore = new Date(nowMinusTwoDays())
const twoDaysBeforeISO = new Date(nowMinusTwoDays()).toISOString()
const twoDaysBeforePair = localDate(twoDaysBefore.getTime())

const D: SessionV2 = {
  id: '0',
  consumerCountry: 'LT',
  serviceType: 'wireguard',
  durationSeconds: 120,
  startedAt: new Date().toISOString(),
  earnings: {
    wei: '0',
    ether: '1.00',
    human: '1.00',
  },
  transferredBytes: 1_000_000,
}

const S = (or: Partial<SessionV2> = {}): SessionV2 => ({ ...D, ...or })

const curried2Pairs = (type: ChartType, data: SessionV2 | SessionV2[]) =>
  series._convert('7d', type, Array.isArray(data) ? data : [data])

// 1663246040 === Thu Sep 15 2022 15:47:20 GMT+0300 (Eastern European Summer Time) {}
test.each<{ entry: SessionV2 | SessionV2[]; type: ChartType; expected: Pair }>([
  {
    entry: S({ transferredBytes: 130000000, startedAt: twoDaysBeforeISO }),
    type: 'data',
    expected: { x: twoDaysBeforePair, y: 0.12 },
  },
  {
    entry: S({ earnings: { ...TOKENS_EMPTY, human: '1000' }, startedAt: twoDaysBeforeISO }),
    type: 'earnings',
    expected: { x: twoDaysBeforePair, y: 1000 },
  },
  {
    entry: [S({ startedAt: twoDaysBeforeISO }), S({ startedAt: twoDaysBeforeISO })],
    type: 'sessions',
    expected: { x: twoDaysBeforePair, y: 2 },
  },
])('pair conversion %j', ({ entry, type, expected }) => {
  // given
  const pairs = curried2Pairs(type, entry)
  const found = pairs.find((m) => m.y !== 0)

  // expect
  expect(found).toBeDefined()
  expect(found?.y).toEqual(expected.y)
  expect(found?.x).toEqual(expected.x)
})
