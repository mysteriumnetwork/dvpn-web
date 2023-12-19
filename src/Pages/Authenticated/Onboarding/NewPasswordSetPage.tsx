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
import { RootState } from '../../../redux/store'
import { IdentityRegistrationStatus } from 'mysterium-vpn-js'
import { configs } from '../../../commons/config'

export const NewPasswordSetPage = () => {
  const isClickBoardDisabled = useIsFeatureEnabled(FEATURES.DISABLE_CLICKBOARDING)
  const identity = useAppSelector(selectors.currentIdentity)
  const location = useLocation()
  const apiKey = configs.mmnApiKey()

  const isDefaultCredentials = useAppSelector(({ app }: RootState) => app.auth.withDefaultCredentials)

  const isPasswordReset =
    identity.registrationStatus !== IdentityRegistrationStatus.Unregistered && isDefaultCredentials

  const isMissingApiKey = !apiKey && !isClickBoardDisabled

  if (isPasswordReset) {
    // special case for instant registration
    if (isMissingApiKey) {
      return <Navigate to={ROUTES.QUICK_ONBOARDING + location.search} replace />
    }

    return <Navigate to={ROUTES.PASSWORD_RESET} />
  }

  if (!isClickBoardDisabled) {
    return <Navigate to={ROUTES.QUICK_ONBOARDING + location.search} replace />
  }

  return <Navigate to={ROUTES.ADVANCED_ONBOARDING + location.search} replace />
}
