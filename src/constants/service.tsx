/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { EarningsPerServiceResponse } from 'mysterium-vpn-js'
import Link from '../components/Links/Link'

type ServiceTooltips = {
  readonly earnings?: ReactNode
}

type ServiceDescriptor = {
  readonly type: string
  readonly name: string
  readonly description: string | ReactNode
  readonly tooltips?: ServiceTooltips
}

export const SUPPORTED_SERVICES: ServiceDescriptor[] = [
  {
    name: 'B2B Data Scraping',
    type: 'scraping',
    description: 'Data scraping traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from Data Scrapping service in the last 30 days',
    },
  },
  {
    name: 'B2B VPN and data transfer',
    type: 'data_transfer',
    description: 'Streaming and data transfer traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from B2B VPN and data transfer service in the last 30 days',
    },
  },

  {
    name: 'VPN',
    type: 'dvpn',
    description: (
      <>
        <Link href="https://mysteriumvpn.com" target="_blank">
          Mysterium VPN
        </Link>{' '}
        app user traffic
      </>
    ),
    tooltips: {
      earnings: 'The total amount of MYST earned from VPN service in the last 30 days',
    },
  },
  {
    name: 'Public',
    type: 'wireguard',
    description: (
      <>
        Open to the whole network, including 3rd party and{' '}
        <Link href="https://mysteriumvpn.com/godark" target="_blank">
          Mysterium Dark
        </Link>{' '}
        app user traffic
      </>
    ),
    tooltips: {
      earnings: 'The total amount of MYST earned from public service in the last 30 days',
    },
  },
]
export const SUPPORTED_SERVICES_MOBILE: ServiceDescriptor[] = [
  {
    name: 'B2B Data Scraping',
    type: 'scraping',
    description: 'Data scraping traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from Data Scrapping service in the last 30 days',
    },
  },
  {
    name: 'B2B VPN and data transfer',
    type: 'data_transfer',
    description: 'Streaming and data transfer traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from B2B VPN and data transfer service in the last 30 days',
    },
  },

  {
    name: 'VPN',
    type: 'dvpn',
    description: (
      <>
        <Link href="https://mysteriumvpn.com" target="_blank">
          Mysterium VPN
        </Link>{' '}
        app user traffic
      </>
    ),
    tooltips: {
      earnings: 'The total amount of MYST earned from VPN service in the last 30 days',
    },
  },
]

export type ServiceEarningsKeys = keyof EarningsPerServiceResponse
export const serviceTypeToEarningPerServiceKey = (type: string): ServiceEarningsKeys => {
  switch (type) {
    case 'wireguard':
      return 'publicTokens'
    case 'dvpn':
      return 'dvpnTokens'
    case 'data_transfer':
      return 'dataTransferTokens'
    case 'scraping':
      return 'scrapingTokens'
    default:
      return 'totalTokens'
  }
}

export const serviceTypeToTotalNetworkEarningPerServiceKey = (type: string): ServiceEarningsKeys => {
  switch (type) {
    case 'wireguard':
      return 'totalPublicTokens'
    case 'data_transfer':
      return 'totalDataTransferTokens'
    case 'dvpn':
      return 'totalDvpnTokens'
    case 'scraping':
      return 'totalScrapingTokens'
    default:
      return 'totalTokens'
  }
}
