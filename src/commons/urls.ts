/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Config } from 'mysterium-vpn-js'
import { configs } from './config'
import FEATURES from './features'
import { ANDROID_DEEPLINK } from '../constants/urls'
import routes from '../constants/routes'

const current = (path?: string): string => `${new URL(window.location.href).origin}${path ? `/#${path}` : ''}`

const featureAwareCurrentOrigin = (config: Config): string => {
  const deeplinkEnabled = configs.isFeatureEnabled(config, FEATURES.SSO_DEEPLINK.name)
  return deeplinkEnabled ? ANDROID_DEEPLINK : current(routes.AUTH_SSO)
}

export const urls = {
  currentOrigin: current,
  featureAwareCurrentOrigin,
}
