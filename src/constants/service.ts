/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EarningsPerServiceResponse } from 'mysterium-vpn-js'

export interface ServiceDescriptor {
  type: string
  name: string
  description: string
}

export const SUPPORTED_SERVICES: ServiceDescriptor[] = [
  {
    name: 'Public',
    type: 'wireguard',
    description: 'Open to the whole network',
  },
  {
    name: 'B2B VPN and data transfer',
    type: 'data_transfer',
    description: 'Streaming and data transfer traffic from B2B clients',
  },
  {
    name: 'B2B Data Scraping',
    type: 'scraping',
    description: 'Data scraping traffic from B2B clients',
  },
]

export type ServiceEarningsKeys = keyof EarningsPerServiceResponse
export const serviceTypeToEarningPerServiceKey = (type: string): ServiceEarningsKeys => {
  switch (type) {
    case 'wireguard':
      return 'public'
    case 'data_transfer':
      return 'dataTransfer'
    case 'scraping':
      return 'scraping'
    default:
      return 'total'
  }
}
