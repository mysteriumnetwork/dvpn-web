/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { LatestWithdrawal } from './LatestWithdrawal'
import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { tequilaFixtures } from '../../../../commons/tequila-fixtures.test'

test('link', async () => {
  // given
  const url = 'https://polygonscan.com/tx/0x0423b4876780466a4d2e3825037a83a8ceafe549077d6fb161f3a57c10bb15bf'
  setupServer(
    rest.get('/tequilapi/transactor/settle/history', (req, res, ctx) => {
      return res(ctx.json(tequilaFixtures.pagedResponse({ ...tequilaFixtures.defaultTx, block_explorer_url: url })))
    }),
  ).listen()

  // expect
  render(<LatestWithdrawal />)
  const anchor = await screen.findByTestId('LatestWithdrawal.txLink')
  expect(anchor).toHaveTextContent('0x0423b4876780466a4d2e3825037a83a8ceafe549077d6fb161f3a57c10bb15bf')
  expect(anchor).toHaveAttribute('href', url)

  const notRendered = await screen.queryByTestId('LatestWithdrawal.txPlain')
  expect(notRendered).toBeNull()
})

test('no tx', async () => {
  // given
  setupServer(
    rest.get('/tequilapi/transactor/settle/history', (req, res, ctx) => {
      return res(ctx.json(tequilaFixtures.pagedResponse([])))
    }),
  ).listen()

  // expect
  const { container } = render(<LatestWithdrawal />)
  expect(container).toBeEmptyDOMElement()
  expect(await screen.queryByTestId('LatestWithdrawal.txLink')).toBeNull()
  expect(await screen.queryByTestId('LatestWithdrawal.txPlain')).toBeNull()
})
