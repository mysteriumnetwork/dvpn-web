/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EarningsPerServiceResponse } from 'mysterium-vpn-js'
import { ServiceTooltips } from '../Pages/Authenticated/Components/Service/ServiceCard'
import { Fragment, ReactNode } from 'react'
import { Link } from '../Components/Common/Link'

export interface ServiceDescriptor {
  type: string
  name: string
  description: string | ReactNode
  tooltips?: ServiceTooltips
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
      <Fragment>
        <Link href={'https://mysteriumvpn.com'}>Mysterium VPN </Link> app user traffic
      </Fragment>
    ),
    tooltips: {
      earnings: 'The total amount of MYST earned from VPN service in the last 30 days',
    },
  },
  {
    name: 'Public',
    type: 'wireguard',
    description: (
      <Fragment>
        Open to the whole network, including 3rd party and
        <Link href={'https://mysteriumvpn.com/godark'}> Mysterium Dark </Link>
        app user traffic
      </Fragment>
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
    // change this later
    description: (
      <Fragment>
        <Link href={'https://mysteriumvpn.com'}>Mysterium VPN</Link> app user traffic
      </Fragment>
    ),
    tooltips: {
      //change this later
      earnings: 'The total amount of MYST earned from dvpn service in the last 30 days',
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
