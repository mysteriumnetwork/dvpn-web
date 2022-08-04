/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { currentCurrency } from '../../../../commons/currency'

export interface SupportedGateways {
  [key: 'direct' | 'paypal' | 'empty' | 'stripe' | string]: {
    summary: string
    component: string
  }
}

export const SUPPORTED_GATEWAYS: SupportedGateways = Object.freeze({
  empty: {
    summary: '',
    component: 'Empty',
  },
  direct: {
    summary: `Deposit ${currentCurrency()} token`,
    component: 'Direct',
  },
  paypal: {
    summary: `Deposit with PayPal (1 USD)`,
    component: 'Gateway',
  },
  stripe: {
    summary: `Deposit with Credit or Debit card (1 USD)`,
    component: 'Gateway',
  },
})
