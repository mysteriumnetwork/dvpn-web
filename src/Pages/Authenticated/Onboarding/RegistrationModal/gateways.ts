/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { currentCurrency } from '../../../../commons/currency'
import { ReactComponent as DirectSVG } from '../../../../assets/images/onboarding/direct.svg'
import { ReactComponent as PayPalSVG } from '../../../../assets/images/onboarding/paypal.svg'
import { ReactComponent as StripeSVG } from '../../../../assets/images/onboarding/strip.svg'

export interface SupportedGateways {
  [key: 'direct' | 'paypal' | 'empty' | 'stripe' | string]: {
    title: string
    description: string
    summary: string
    component: string
    note?: string
    logo?: any
  }
}

export const SUPPORTED_GATEWAYS: SupportedGateways = Object.freeze({
  empty: {
    summary: '',
    title: '',
    description: '',
    component: 'Empty',
  },
  direct: {
    summary: `Deposit ${currentCurrency()} token`,
    title: 'Transfer MYST ',
    description:
      'Send no less than 0.11 MYST to the address below. Important: only Polygon blockchain MYST is supported! Dont’t have any MYST? Read here now to get it.',
    component: 'Direct',
    logo: DirectSVG,
  },
  paypal: {
    summary: `Deposit with PayPal (1 USD)`,
    title: 'Pay with Paypal ',
    description:
      'You will be charged 1 USD plus applicable VAT. Please select your country of residence below to proceed. ',
    component: 'Gateway',
    note:
      'Note: After clicking Pay 1 USD below, new tab/window will be opened and you will be redirected to Paypal to complete transaction.',
    logo: PayPalSVG,
  },
  stripe: {
    summary: `Deposit with Credit or Debit card (1 USD)`,
    title: 'Pay with Credit or Debit card',
    description:
      'You will be charged 1 USD plus applicable VAT. Please select your country of residence below to proceed.',
    component: 'Gateway',
    note:
      'Note: After clicking Pay 1 USD below, new tab/window will be opened and you will be redirected to complete transaction.',
    logo: StripeSVG,
  },
})
