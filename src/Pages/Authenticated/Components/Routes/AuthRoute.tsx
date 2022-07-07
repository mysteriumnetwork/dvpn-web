/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Navigate } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { useAppSelector } from '../../../../commons/hooks'
import { LOGIN } from '../../../../constants/routes'

interface Props {
  children: ReactElement
}

export const AuthRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(({ app }) => app.auth.authenticated)

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} />
  }

  return children
}
