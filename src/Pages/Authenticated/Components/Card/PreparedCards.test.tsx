/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@testing-library/jest-dom'
import { Cards } from './PreparedCards'
import { render, screen } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { fixtures } from '../../../../commons/fixtures.test'
import { DECIMAL_PART } from 'mysterium-vpn-js'

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
beforeEach(() => {
  useSelectorMock.mockClear()
})

test.each([
  { actual: 0, expected: '0.0000000 MYST' },
  { actual: 1, expected: '< 0.0000001 MYST' },
  { actual: DECIMAL_PART, expected: '1.0000000 MYST' },
])('MYST value displayed correctly', async (data) => {
  // given
  const identity = fixtures.defaultIdentity
  useSelectorMock.mockReturnValue({ ...identity, balance: data.actual })

  // expect
  render(<Cards.Balance />)
  expect(await screen.queryByTestId('HeroStatCard.value')).toHaveTextContent(data.expected)
})
