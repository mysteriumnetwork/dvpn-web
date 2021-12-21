/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash'
import { Config } from 'mysterium-vpn-js/lib/config/config'
import { toastError } from './toast.utils'

export const SUPPORTED_TRAVERSALS = ['manual', 'upnp', 'holepunching']

export const isTrafficShapingEnabled = (c: Config): boolean => {
  return _.get<Config, any>(c, 'data.shaper.enabled')
}

export const trafficShapingBandwidthKBps = (c: Config): number => {
  return _.get<Config, any>(c, 'data.shaper.bandwidth')
}

export const isAccessPolicyEnabled = (c: Config): boolean => {
  return !!_.get<Config, any>(c, 'data.access-policy.list')
}

export const chainId = (c: Config): number => {
  return _.get<Config, any>(c, 'data.chain-id')
}

export const udpPorts = (c: Config): string => {
  return _.get<Config, any>(c, 'data.udp.ports')
}

export const natTraversals = (c: Config): string => {
  return _.get<Config, any>(c, 'data.traversal') || ''
}

export const rpcl2 = (c?: Config): string[] => {
  return _.get<Config, any>(c, 'data.ether.client.rpcl2') || []
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
  return dropLeadingSlash(_.get<Config, any>(c, 'data.mmn.web-address') || '#')
}

export const stunServers = (c?: Config): string[] => {
  return _.get<Config, any>(c, 'data.stun-servers') || []
}

export const zeroStakeSettlementThreshold = (c?: Config): number => {
  return _.get<Config, any>(c, 'data.payments.zero-stake-unsettled-amount') || []
}

export const docsAddress = (c?: Config): string => {
  let url = _.get<Config, any>(c, 'data.docs-url') || '#'
  return dropLeadingSlash(url)
}

const valueOrError = (c?: Config, path?: string): string => {
  const address = _.get<Config, any>(c, path) || '#'

  try {
    const url = new URL(address)
    return url.hostname
  } catch {
    toastError(`${path} - not valid`)
    return 'error'
  }
}

export const mmnDomainName = (c?: Config): string => {
  return valueOrError(c, 'data.mmn.web-address')
}

export const mmnApiUrl = (c?: Config): string => {
  return valueOrError(c, 'data.mmn.api-address')
}

export const mmnApiKey = (c?: Config): string => {
  return _.get<Config, any>(c, 'data.mmn.api-key')
}

const defaultFiatAmount = (c?: Config): number => {
  return _.get<Config, any>(c, 'data.nodeui.default-fiat-amount') || 1
}

export const configParser = {
  isTrafficShapingEnabled,
  trafficShapingBandwidthKBps,
  isAccessPolicyEnabled,
  chainId,
  udpPorts,
  natTraversals,
  rpcl2,
  hermesId,
  mmnWebAddress,
  stunServers,
  zeroStakeSettlementThreshold,
  docsAddress,
  mmnDomainName,
  mmnApiUrl,
  mmnApiKey,
  defaultFiatAmount,
}
