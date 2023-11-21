/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const name = (serviceType: string) => {
  switch (serviceType) {
    case 'wireguard':
      return 'Public'
    case 'scraping':
      return 'B2B Data Scraping'
    case 'data_transfer':
      return 'B2B VPN and data transfer'
    case 'dvpn':
      return 'Mysterium VPN'
    default:
      return 'Unknown'
  }
}

const services = {
  name,
}

export default services
