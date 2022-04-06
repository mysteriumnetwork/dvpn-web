/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IdentityRegistrationStatus, Identity } from 'mysterium-vpn-js'

const defaultIdentity: Identity = Object.freeze({
  id: '0x0',
  registrationStatus: IdentityRegistrationStatus.Registered,
  channelAddress: '0x1',
  balance: 1,
  balanceTokens: {
    wei: '000000000000000001',
    ether: '0',
    human: '0',
  },
  earnings: 1,
  earningsTokens: {
    wei: '000000000000000001',
    ether: '0',
    human: '0',
  },
  earningsTotal: 1,
  earningsTotalTokens: {
    wei: '000000000000000001',
    ether: '0',
    human: '0',
  },
  stake: 1,
  hermesId: '0x2',
  earningsPerHermes: {
    '0x1': {
      earningsTokens: {
        wei: '000000000000000001',
        ether: '0',
        human: '0',
      },
      earningsTotalTokens: {
        wei: '000000000000000001',
        ether: '0',
        human: '0',
      },
    },
    '0x2': {
      earningsTokens: {
        wei: '000000000000000001',
        ether: '0',
        human: '0',
      },
      earningsTotalTokens: {
        wei: '000000000000000001',
        ether: '0',
        human: '0',
      },
    },
  },
})

export const fixtures = {
  defaultIdentity,
}

test('ignore', () => {
  expect(1).toEqual(1)
})
