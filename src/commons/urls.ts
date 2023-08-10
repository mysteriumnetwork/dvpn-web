/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js'
import { configs } from './config'
import FEATURES from './features'

const current = (path?: string): string => `${new URL(window.location.href).origin}${path ? `/#${path}` : ''}`

const featureAwareCurrentOrigin = (config: Config, route: string, deeplink: string): string => {
  const deeplinkEnabled = configs.isFeatureEnabled(config, FEATURES.SSO_DEEPLINK.name)
  return deeplinkEnabled ? deeplink : current(route)
}

export const urls = {
  currentOrigin: current,
  featureAwareCurrentOrigin,
}
