/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChainSummary } from 'mysterium-vpn-js'

const toOptions = (chainSummary: ChainSummary) => {
  const { chains } = chainSummary
  return Object.keys(chains)
    .map(Number)
    .map((k) => {
      const chainName = chains[k]
      return {
        value: k,
        label: chainName,
      }
    })
}

const mapping = {
  toOptions,
}

export default mapping
