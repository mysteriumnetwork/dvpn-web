/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface ServiceDescriptor {
  type: string
  name: string
  description: string
}

export const SUPPORTED_SERVICES: ServiceDescriptor[] = [
  {
    name: 'Public',
    type: 'wireguard',
    description: 'Open to the whole network.',
  },
  {
    name: 'B2B VPN and data transfer',
    type: 'data_transfer',
    description: 'Streaming and data transfer traffic from B2B clients',
  },
  {
    name: 'B2B Data Scrapping',
    type: 'scraping',
    description: 'Data scrapping traffic from B2B clients',
  },
]
