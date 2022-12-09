/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EarningsPerServiceResponse } from 'mysterium-vpn-js'
import { ServiceTooltips } from '../Pages/Authenticated/Components/Service/ServiceCard'

export interface ServiceDescriptor {
  type: string
  name: string
  dataTestId?: string
  description: string
  tooltips?: ServiceTooltips
}

export const SUPPORTED_SERVICES: ServiceDescriptor[] = [
  {
    name: 'Public',
    dataTestId: 'Services.public',
    type: 'wireguard',
    description: 'Open to the whole network',
    tooltips: {
      earnings: 'The total amount of MYST earned from public service in the last 30 days',
    },
  },
  {
    name: 'B2B VPN and data transfer',
    dataTestId: 'Services.dataTransfer',
    type: 'data_transfer',
    description: 'Streaming and data transfer traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from B2B VPN and data transfer service in the last 30 days',
    },
  },
  {
    name: 'B2B Data Scraping',
    dataTestId: 'Services.B2BDataScraping',
    type: 'scraping',
    description: 'Data scraping traffic from B2B clients',
    tooltips: {
      earnings: 'The total amount of MYST earned from Data Scrapping service in the last 30 days',
    },
  },
]

export type ServiceEarningsKeys = keyof EarningsPerServiceResponse
export const serviceTypeToEarningPerServiceKey = (type: string): ServiceEarningsKeys => {
  switch (type) {
    case 'wireguard':
      return 'publicTokens'
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
    case 'scraping':
      return 'totalScrapingTokens'
    default:
      return 'totalTokens'
  }
}
