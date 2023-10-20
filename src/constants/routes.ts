/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const HOME = '/'
export const DASHBOARD = '/dashboard'
export const NODE_CLAIM = '/node-claim'
export const NEW_PASSWORD = '/new-password'
const QUICK_ONBOARDING = '/quick-onboarding'
const ADVANCED_ONBOARDING = '/advanced-onboarding'
export const HISTORY = '/history'
export const TRANSACTIONS = '/transactions'
export const SETTINGS = '/settings'
export const SETTINGS_ACCOUNT = `${SETTINGS}/account`
export const SETTINGS_TRAFFIC = `${SETTINGS}/traffic`
export const SETTINGS_ADVANCED = `${SETTINGS}/advanced`
export const SESSIONS_SIDE = '/sessions-side'
export const ERROR = '/error'
export const ADMIN = '/admin'
const STORYBOOK = '/storybook'
const AUTH_SSO = '/auth-sso'
const CLAIM = '/node-claim'
const CLICKBOARDING = '/clickboarding'
const PASSWORD_RESET = '/password-reset'

const ROUTES = {
  QUICK_ONBOARDING,
  ADVANCED_ONBOARDING,
  PASSWORD_RESET,
  HOME,
  DASHBOARD,
  NEW_PASSWORD,
  HISTORY,
  TRANSACTIONS,
  SETTINGS,
  SETTINGS_ACCOUNT,
  SETTINGS_TRAFFIC,
  SETTINGS_ADVANCED,
  SESSIONS_SIDE,
  ERROR,
  ADMIN,
  STORYBOOK,
  AUTH_SSO,
  CLICKBOARDING,
  CLAIM,
}

export default ROUTES
