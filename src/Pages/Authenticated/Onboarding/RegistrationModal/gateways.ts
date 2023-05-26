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
import styled from 'styled-components'
import { devices } from '../../../../theme/themes'

const Direct = styled(DirectSVG)`
  height: 400px;
  width: 500px;
  > rect {
    fill: ${({ theme }) => theme.onboarding.bgSvg};
  }
  @media ${devices.tablet} {
    height: 180px;
    width: 400px;
  }
`
const PayPal = styled(PayPalSVG)`
  height: 400px;
  width: 500px;
  > rect {
    fill: ${({ theme }) => theme.onboarding.bgSvg};
  }
  @media ${devices.tablet} {
    height: 180px;
    width: 400px;
  }
`
const Stripe = styled(StripeSVG)`
  height: 400px;
  width: 500px;
  > rect {
    fill: ${({ theme }) => theme.onboarding.bgSvg};
  }
  @media ${devices.tablet} {
    height: 180px;
    width: 400px;
  }
`

interface GatewayDescriptor {
  title: string
  description: string
  summary: (value?: string) => string
  component: string
  note?: string
  logo?: any
}

const EMPTY: GatewayDescriptor = {
  summary: () => '',
  title: '',
  description: '',
  component: 'Empty',
}

export const SUPPORTED_GATEWAYS: Map<string, GatewayDescriptor> = new Map<
  'direct' | 'paypal' | 'empty' | 'stripe' | string,
  GatewayDescriptor
>([
  ['empty', EMPTY],
  [
    'direct',
    {
      summary: (value) => `Deposit ${value} ${currentCurrency()} token`,
      title: 'Transfer MYST ',
      description:
        'Send no less than 0.11 MYST to the address below. Important: only Polygon blockchain MYST is supported! Dont’t have any MYST? Read here now to get it.',
      component: 'Direct',
      logo: Direct,
    },
  ],
  [
    'paypal',
    {
      summary: () => `Pay with PayPal (1 USD)`,
      title: 'Pay with Paypal ',
      description:
        'You will be charged 1 USD plus applicable VAT. Please select your country of residence below to proceed. ',
      component: 'Gateway',
      note:
        'Note: After clicking Pay 1 USD below, new tab/window will be opened and you will be redirected to Paypal to complete transaction.',
      logo: PayPal,
    },
  ],
  [
    'stripe',
    {
      summary: () => `Pay with Credit or Debit card (1 USD)`,
      title: 'Pay with Credit or Debit card',
      description:
        'You will be charged 1 USD plus applicable VAT. Please select your country of residence below to proceed.',
      component: 'Gateway',
      note:
        'Note: After clicking Pay 1 USD below, new tab/window will be opened and you will be redirected to complete transaction.',
      logo: Stripe,
    },
  ],
])

export const gatewayDescriptor = (gatewayName: string): GatewayDescriptor => {
  return SUPPORTED_GATEWAYS.get(gatewayName) ?? EMPTY
}
