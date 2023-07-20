/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import _ from 'lodash'
import { Config } from 'mysterium-vpn-js'
import toasts from './toasts'
import localStorageWrapper from './localStorageWrapper'
import { localStorageKeys } from '../constants/local-storage.keys'

const { toastError } = toasts
const { FEATURES } = localStorageKeys

export const SUPPORTED_TRAVERSALS = ['manual', 'upnp', 'holepunching']

const isTrafficShapingEnabled = (c: Config): boolean => {
  return _.get<Config, any>(c, 'data.shaper.enabled')
}

const trafficShapingBandwidthKBps = (c: Config): number => {
  return _.get<Config, any>(c, 'data.shaper.bandwidth')
}

const isAccessPolicyEnabled = (c: Config): boolean => {
  return !!_.get<Config, any>(c, 'data.access-policy.list')
}

const isUserspaceProvider = (c: Config): boolean => {
  const userSpace = _.get<Config, any>(c, 'data.userspace')
  if (typeof userSpace === 'string') {
    return userSpace === 'true'
  }
  return userSpace
}

const chainId = (c: Config): number => {
  return _.get<Config, any>(c, 'data.chain-id')
}

const udpPorts = (c: Config): string => {
  return _.get<Config, any>(c, 'data.udp.ports')
}

const natTraversals = (c: Config): string => {
  return _.get<Config, any>(c, 'data.traversal') || ''
}

const rpcl2 = (c?: Config): string[] => {
  return _.get<Config, any>(c, 'data.ether.client.rpcl2') || []
}

const hermesId = (c?: Config): string | undefined => {
  const chainId = _.get<Config, any>(c, 'data.chain-id')
  const chains = _.get<Config, any>(c, 'data.chains')
  const chainNumber = _.find(Object.keys(chains), (k) => chains[k].chainid === chainId)
  if (!chainNumber) {
    return undefined
  }
  return chains[chainNumber].hermes
}

const dropLeadingSlash = (s: string): string => {
  return s.endsWith('/') ? s.substring(0, s.length - 1) : s
}

const mmnWebAddress = (c?: Config): string => {
  return dropLeadingSlash(_.get<Config, any>(c, 'data.mmn.web-address') || '#')
}

const stunServers = (c?: Config): string[] => {
  return _.get<Config, any>(c, 'data.stun-servers') || []
}

const zeroStakeSettlementThreshold = (c?: Config): number => {
  return _.get<Config, any>(c, 'data.payments.zero-stake-unsettled-amount') || []
}

const docsAddress = (c?: Config): string => {
  let url = _.get<Config, any>(c, 'data.docs-url') || '#'
  return dropLeadingSlash(url)
}

// TODO strange behaviour investigate
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

const urlAddressOrError = (c?: Config, path?: string): string => {
  const address = _.get<Config, any>(c, path) || '#'

  try {
    new URL(address)
    return address
  } catch {
    toastError(`${path} - not valid`)
    return 'error'
  }
}

const mmnDomainName = (c?: Config): string => {
  return valueOrError(c, 'data.mmn.web-address')
}

const mmnApiUrl = (c?: Config): string => {
  return valueOrError(c, 'data.mmn.api-address')
}

const mmnApiKey = (c?: Config): string => {
  return _.get<Config, any>(c, 'data.mmn.api-key')
}

const pilvytisUrl = (c?: Config): string => {
  return urlAddressOrError(c, 'data.pilvytis.address')
}

const uiFeatures = (c: Config): string[] => {
  const configFeatures = _.get<Config, any>(c, 'data.ui.features')
  if (configFeatures) {
    return configFeatures.split(',')
  }
  const lsFeaturesString = localStorageWrapper.getSettings(FEATURES)
  if (lsFeaturesString) {
    return lsFeaturesString.toString().split(',')
  }
  return []
}

const isFeatureEnabled = (c: Config, name: string): boolean => {
  return uiFeatures(c).includes(name)
}

export const configs = {
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
  pilvytisUrl,
  uiFeatures,
  isFeatureEnabled,
  isUserspaceProvider,
}
