/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity } from 'mysterium-vpn-js'

const hermesIds = (identity: Identity): string[] => {
  return Object.keys(identity.earningsPerHermes)
}

const identities = {
  hermesIds,
}

export default identities
