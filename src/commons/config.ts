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
  return _.get<Config, any>(c, 'data.testnet2')
}

export const isTrafficShapingEnabled = (c: Config): boolean => {
  return _.get<Config, any>(c, 'data.shaper.enabled')
}

export const isAccessPolicyEnabled = (c: Config): boolean => {
  return !!_.get<Config, any>(c, 'data.access-policy.list')
}

export const servicePricePerGb = (c: Config, s: ServiceType): number => {
  return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-gb`) || 0
}

export const servicePricePerMin = (c: Config, s: ServiceType): number => {
  return _.get<Config, any>(c, `data.${s.toLowerCase()}.price-minute`) || 0
}

export const defaultPricePerGb = (c: Config): number => {
  return _.get<Config, any>(c, `data.payment.price-gb`) || 0
}

export const defaultPricePerMin = (c: Config): number => {
  return _.get<Config, any>(c, `data.payment.price-minute`) || 0
}

export const pricePerGbMax = (c: Config): number => {
  const max = _.get<Config, any>(c, `data.payments.consumer.price-pergib-max`) || 0

  return max / DECIMAL_PART
}

export const pricePerMinMax = (c: Config): number => {
  const max = _.get<Config, any>(c, `data.payments.consumer.price-perminute-max`) || 0

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

export const hermesId = (c?: Config): string => {
  return _.get<Config, any>(c, 'data.hermes.hermes-id')
}

export const mmnWebAddress = (c?: Config): string => {
  let url = _.get<Config, any>(c, 'data.mmn.web-address') || '#'
  if (url.endsWith('/')) {
    url = url.substr(0, url.length - 1)
  }
  return url
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
  return isTestnet || isTestnet2
}
