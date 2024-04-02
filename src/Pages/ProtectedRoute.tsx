/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../commons/hooks'
import { RootState } from '../redux/store'
import ROUTES, { NEW_PASSWORD } from '../constants/routes'

export interface Redirect {
  condition: boolean
  to: string
}

interface ProtectedProps {
  redirects?: Redirect[]
}

export const Protected = ({ redirects = [] }: ProtectedProps) => {
  const defaultCredentials = useAppSelector(({ app }: RootState) => app.auth.withDefaultCredentials)

  const redirect = redirects.find((r) => r.condition)

  const location = useLocation()
  if (
    defaultCredentials &&
    ![ROUTES.NEW_PASSWORD, ROUTES.ADVANCED_ONBOARDING, ROUTES.QUICK_ONBOARDING, ROUTES.PASSWORD_RESET].includes(
      location.pathname.toLowerCase(),
    )
  ) {
    return <Navigate to={NEW_PASSWORD} />
  }

  if (redirect) {
    return <Navigate to={redirect.to} />
  }

  return <Outlet />
}
