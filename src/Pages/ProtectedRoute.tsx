/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface Redirect {
  condition: boolean
  to: string
}

interface ProtectedProps {
  redirects?: Redirect[]
  children: ReactElement
}

export const Protected = ({ children, redirects = [] }: ProtectedProps) => {
  const redirect = redirects.find((r) => r.condition)

  if (redirect) {
    return <Navigate to={redirect.to} />
  }

  return children
}
