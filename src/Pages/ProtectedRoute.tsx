/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../commons/hooks'
import ROUTES from '../constants/routes'
import { selectors } from '../redux/selectors'

const authenticatedRoutes = [
  ROUTES.DASHBOARD,
  ROUTES.NODE_CLAIM,
  ROUTES.HISTORY,
  ROUTES.SETTINGS,
  ROUTES.SETTINGS_ACCOUNT,
  ROUTES.SETTINGS_TRAFFIC,
  ROUTES.SETTINGS_ADVANCED,
  ROUTES.TRANSACTIONS,
  ROUTES.SESSIONS_SIDE,
  ROUTES.ADMIN,
  ROUTES.STORYBOOK,
]

const controlledRedirectRoutes = [
  ROUTES.NEW_PASSWORD,
  ROUTES.PASSWORD_RESET,
  ROUTES.ADVANCED_ONBOARDING,
  ROUTES.QUICK_ONBOARDING,
]

export const Protected = () => {
  const location = useLocation()
  const auth = useAppSelector(selectors.auth)
  const onBoarding = useAppSelector(selectors.onBoarding)

  if (auth.withDefaultCredentials && !controlledRedirectRoutes.includes(location.pathname.toLowerCase())) {
    return <Navigate to={ROUTES.NEW_PASSWORD} />
  }

  if (!onBoarding.needsPasswordChange && controlledRedirectRoutes.includes(location.pathname.toLowerCase())) {
    return <Navigate to={ROUTES.HOME} />
  }

  if (auth.authenticated && location.pathname.toLowerCase() === ROUTES.HOME) {
    return <Navigate to={ROUTES.DASHBOARD} />
  }

  if (!auth.authenticated && authenticatedRoutes.includes(location.pathname.toLowerCase())) {
    return <Navigate to={ROUTES.HOME} />
  }

  return <Outlet />
}
