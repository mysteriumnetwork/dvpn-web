/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactFragment } from 'react'

export const HowToGetMyst = (): ReactFragment => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        To avoid transaction fees on Ethereum network, we recommend to use Polygon network for MYST transfers. Follow
        these steps to buy MYST tokens needed for registration:
      </div>
      <div>
        1. Buy MATIC token for amount of $ you'd like to spend for MYST on Binance or any other exchange supporting
        Polygon network withdrawal.
      </div>
      <div>
        2. Install Metamask wallet. Configure it work with Polygon (
        <a
          href="https://docs.mysterium.network/for-node-runners/how-to-setup-polygon-myst-on-metamask"
          target="_blank"
          rel="noreferrer"
        >
          see here
        </a>
        ).
      </div>
      <div>
        3. Withdraw your MATIC into wallet address generated by MetaMask. Don't forget to choose Polygon (not Ethereum)
        in Binance withdrawal interface.
      </div>
      <div>
        4. Go to{' '}
        <a
          href="https://quickswap.exchange/#/swap?outputCurrency=0x1379e8886a944d2d9d440b3d88df536aea08d9f3"
          target="_blank"
          rel="noreferrer"
        >
          QuickSwap
        </a>{' '}
        and swap your MATIC to MYST.
      </div>
      <div>5. Send required MYST amount for your node registration.</div>
    </div>
  )
}
