/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { LOGIN, ON_BOARDING_HOME } from '../constants/routes'

interface ProtectedProps {
  loggedIn: boolean
  needsOnBoarding: boolean
  children: ReactElement
}

export const Protected = ({ loggedIn, needsOnBoarding, children }: ProtectedProps) => {
  if (!loggedIn) {
    return <Navigate to={LOGIN} />
  }
  if (needsOnBoarding) {
    return <Navigate to={ON_BOARDING_HOME} />
  }

  return children
}

export const RedirectOrRender = ({
  redirectCondition,
  redirectTo,
  children,
}: {
  redirectCondition: boolean
  redirectTo: string
  children: JSX.Element
}) => {
  return redirectCondition ? <Navigate to={redirectTo} /> : children
}
