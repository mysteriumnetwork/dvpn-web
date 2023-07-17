/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Feature = {
  name: string
  description: string
}

const FEATURES: { [key: string]: Feature } = {
  UPDATE_NOTIFICATIONS: {
    name: 'disableUpdateNotifications',
    description: 'Disable node update notifications',
  },
  RESTART: {
    name: 'restart',
    description: 'Ability to restart node from NodeUI',
  },
  ERROR_LOGGING: {
    name: 'error logging',
    description: 'NodeUI will log recent errors to local storage',
  },
  MOBILE_PROVIDER: {
    name: 'android_mobile_node',
    description: 'Enable/Disable features specific for mobile providers',
  },
  SSO_DEEPLINK: {
    name: 'android_sso_deeplink',
    description: 'Replace localhost as destination for SSO with deeplink',
  },
  SSO_HIDE: {
    name: 'android_sso_hide',
    description: 'Hides SSO feature',
  },
}

export default FEATURES
