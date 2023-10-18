/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useIsFeatureEnabled } from '../../../commons/hooks'
import ROUTES from '../../../constants/routes'
import FEATURES from '../../../commons/features'

export const NewPasswordSetPage = () => {
  const isClickBoardDisabled = useIsFeatureEnabled(FEATURES.DISABLE_CLICKBOARDING)

  const location = useLocation()

  if (!isClickBoardDisabled) {
    return <Navigate to={ROUTES.QUICK_ONBOARDING + location.search} replace />
  }

  return <Navigate to={ROUTES.ADVANCED_ONBOARDING + location.search} replace />
}
