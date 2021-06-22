/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash'
import { DECIMAL_PART } from 'mysterium-vpn-js'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { ServiceType } from './index'

export const L1ChainId = 5
export const L2ChainId = 80001

export const isFreeRegistration = (c: Config): boolean => {
  return isTestnet(c)
}

export const isTrafficShapingEnabled = (c: Config): boolean => {
  return _.get<Config, any>(c, 'data.shaper.enabled')
}

export const trafficShapingBandwidth = (c: Config): number => {
  return _.get<Config, any>(c, 'data.shaper.bandwidth')
}

export const isAccessPolicyEnabled = (c: Config): boolean => {
  return !!_.get<Config, any>(c, 'data.access-policy.list')
}

export const servicePricePerGiB = (c: Config, s: ServiceType): number => {
  return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-gib`) || defaultPricePerGiB(c)
}

export const servicePricePerHour = (c: Config, s: ServiceType): number => {
  return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-hour`) || defaultPricePerHour(c)
}

export const defaultPricePerGiB = (c: Config): number => {
  return _.get<Config, any>(c, `data.payment.price-gib`) || 0
}

export const defaultPricePerHour = (c: Config): number => {
  return _.get<Config, any>(c, `data.payment.price-hour`) || 0
}

export const pricePerGiBMax = (c: Config): number => {
  const max = _.get<Config, any>(c, `data.payments.consumer.price-gib-max`) || 0

  return max / DECIMAL_PART
}

export const pricePerHourMax = (c: Config): number => {
  const max = _.get<Config, any>(c, `data.payments.consumer.price-hour-max`) || 0

  return max / DECIMAL_PART
}

export const chainId = (c: Config): number => {
  return _.get<Config, any>(c, 'data.chain-id')
}

export const etherscanTxUrl = (c?: Config): string => {
  const etherscanTxUrl = 'https://etherscan.io/tx'

  if (!c) {
    return etherscanTxUrl
  }

  switch (chainId(c)) {
    case 5:
      return 'https://goerli.etherscan.io/tx'
    default:
      return etherscanTxUrl
  }
}

export const hermesId = (c?: Config): string | undefined => {
  const chainId = _.get<Config, any>(c, 'data.chain-id')
  const chains = _.get<Config, any>(c, 'data.chains')
  const chainNumber = _.find(Object.keys(chains), (k) => chains[k].chainid === chainId)
  if (!chainNumber) {
    return undefined
  }
  return chains[chainNumber].hermes
}

const dropLeadingSlash = (s: string): string => {
  return s.endsWith('/') ? s.substr(0, s.length - 1) : s
}

export const mmnWebAddress = (c?: Config): string => {
  let url = _.get<Config, any>(c, 'data.mmn.web-address') || '#'
  return dropLeadingSlash(url)
}

export const docsAddress = (c?: Config): string => {
  let url = _.get<Config, any>(c, 'data.docs-url') || '#'
  return dropLeadingSlash(url)
}

export const mmnDomainName = (c?: Config): string => {
  const address = _.get<Config, any>(c, 'data.mmn.web-address') || '#'

  const url = new URL(address)

  return url.hostname
}

export const mmnApiKey = (c?: Config): string => {
  return _.get<Config, any>(c, 'data.mmn.api-key')
}

export const isTestnet = (c?: Config): boolean => {
  if (!c) {
    return true
  }
  const isTestnet = _.get<Config, any>(c, 'data.testnet') as boolean
  const isTestnet2 = _.get<Config, any>(c, 'data.testnet2') as boolean
  const isTestnet3 = _.get<Config, any>(c, 'data.testnet3') as boolean
  return isTestnet || isTestnet2 || isTestnet3
}
