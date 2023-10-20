/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import { useAppSelector, useIsFeatureEnabled } from '../../../commons/hooks'
import ROUTES from '../../../constants/routes'
import FEATURES from '../../../commons/features'
import { selectors } from '../../../redux/selectors'

export const NewPasswordSetPage = () => {
  const isClickBoardDisabled = useIsFeatureEnabled(FEATURES.DISABLE_CLICKBOARDING)
  const location = useLocation()

  const { needsPasswordChange } = useAppSelector(selectors.onBoarding)

  if (needsPasswordChange) {
    return <Navigate to={ROUTES.PASSWORD_RESET} />
  }

  if (!isClickBoardDisabled) {
    return <Navigate to={ROUTES.QUICK_ONBOARDING + location.search} replace />
  }

  return <Navigate to={ROUTES.ADVANCED_ONBOARDING + location.search} replace />
}
